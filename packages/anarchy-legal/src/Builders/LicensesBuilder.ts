import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

type TJson = Readonly<Record<string, unknown>>;
type TStringMap = Readonly<Record<string, string>>;
type TReadonlyArray<T> = ReadonlyArray<T>;

type TWorkspaceInfo = Readonly<{
  name: string;
  dir: string; // absolute path
  pkgPath: string; // absolute path to package.json
  pkg: Readonly<{
    name: string;
    version?: string;
    dependencies?: TStringMap;
    devDependencies?: TStringMap;
    optionalDependencies?: TStringMap;
  }>;
}>;

type TRootInfo = Readonly<{
  rootDir: string;
  rootPkgPath: string;
  rootPkg: Readonly<{
    name?: string;
    workspaces?: Readonly<{ packages?: TReadonlyArray<string> } | TReadonlyArray<string>>;
  }>;
  workspaces: ReadonlyMap<string, TWorkspaceInfo>;
}>;

type TDependencyNode = Readonly<{
  name: string;
  version: string;
  path?: string;
  license?: unknown;
  repository?: unknown;
  dependencies?: Readonly<Record<string, TDependencyNode>>;
}>;

type TCollected = Readonly<{
  id: string; // name@version
  name: string;
  version: string;
  installPath?: string; // absolute path in node_modules
}>;

type TLicenseEntry = Readonly<{
  id: string;
  name: string;
  version: string;
  licenses: string | TReadonlyArray<string>;
  licenseText?: string;
  repository?: string;
  publisher?: string;
  email?: string;
  url?: string;
  path?: string;
}>;

const readJson = async <T extends TJson>(p: string): Promise<T> => JSON.parse(await fs.readFile(p, 'utf8')) as T;

const exists = async (p: string): Promise<boolean> => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

// ---------- Debug ----------
let DEBUG: boolean = false;
const debugLog = (...args: ReadonlyArray<unknown>): void => {
  if (DEBUG) console.log('[debug]', ...args);
};

// ---------- Monorepo root detection ----------

const hasWorkspacesField = (pkg: any): boolean => {
  const ws = pkg?.workspaces;
  if (!ws) return false;
  if (Array.isArray(ws)) return ws.length > 0;
  if (typeof ws === 'object' && Array.isArray(ws.packages)) return ws.packages.length > 0;
  return false;
};

const findMonorepoRoot = async (startDir: string): Promise<string> => {
  let dir = path.resolve(startDir);
  debugLog('findMonorepoRoot: start at', dir);

  // eslint-disable-next-line functional/no-loop-statements
  for (let i = 0; i < 50; i++) {
    const pkgPath = path.join(dir, 'package.json');
    debugLog('  check', pkgPath);
    if (await exists(pkgPath)) {
      try {
        const pkg = await readJson<any>(pkgPath);
        if (hasWorkspacesField(pkg)) {
          debugLog('  ✔ found workspaces at', pkgPath);
          return dir;
        }
      } catch (e) {
        debugLog('  ! failed to parse', pkgPath, '-', (e as Error).message);
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`Monorepo root not found starting from "${startDir}". Provide --root explicitly pointing to a package.json with "workspaces".`);
};

// ---------- Load root + workspaces ----------

const loadRoot = async (rootDir: string): Promise<TRootInfo> => {
  const rootPkgPath = path.join(rootDir, 'package.json');
  if (!(await exists(rootPkgPath))) {
    throw new Error(`Root package.json not found at: ${rootPkgPath}`);
  }
  const rootPkg = await readJson<TRootInfo['rootPkg']>(rootPkgPath);
  const wsField = rootPkg.workspaces;
  if (!wsField) {
    throw new Error(`"workspaces" not found in root package.json at ${rootPkgPath}`);
  }
  const patterns: TReadonlyArray<string> = Array.isArray(wsField) ? wsField : (wsField.packages ?? []);
  if (patterns.length === 0) {
    throw new Error(`"workspaces" has no packages in ${rootPkgPath}`);
  }

  debugLog('workspaces patterns:', patterns);

  const dirs = await globby(patterns as string[], {
    cwd: rootDir,
    onlyDirectories: true,
    absolute: true,
    expandDirectories: false,
    gitignore: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.*/**']
  });

  debugLog('workspace dirs found:', dirs.length);

  const entries: Array<[string, TWorkspaceInfo]> = [];
  // eslint-disable-next-line functional/no-loop-statements
  for (const dir of dirs) {
    const pkgPath = path.join(dir, 'package.json');
    if (!(await exists(pkgPath))) continue;
    const pkg = await readJson<TWorkspaceInfo['pkg']>(pkgPath);
    if (!pkg.name) continue;
    entries.push([
      pkg.name,
      {
        name: pkg.name,
        dir,
        pkgPath,
        pkg
      }
    ]);
  }
  debugLog('workspace packages loaded:', entries.length);

  if (entries.length === 0) {
    throw new Error(`No workspace package.json files found by patterns: ${patterns.join(', ')}`);
  }
  return {
    rootDir,
    rootPkgPath,
    rootPkg,
    workspaces: new Map(entries)
  };
};

// ---------- Workspace dependency graph ----------

const buildWsGraph = (ws: ReadonlyMap<string, TWorkspaceInfo>): ReadonlyMap<string, ReadonlySet<string>> => {
  const names = new Set(ws.keys());
  const graph = new Map<string, ReadonlySet<string>>();
  // eslint-disable-next-line functional/no-loop-statements
  for (const [name, info] of ws) {
    const deps = info.pkg.dependencies ?? {};
    const edges = new Set<string>();
    // eslint-disable-next-line functional/no-loop-statements
    for (const depName of Object.keys(deps)) {
      if (names.has(depName)) edges.add(depName);
    }
    graph.set(name, edges);
  }
  if (DEBUG) {
    console.log('[debug] workspace graph:');
    // eslint-disable-next-line functional/no-loop-statements
    for (const [k, v] of graph) console.log('  ', k, '->', [...v].join(', ') || '∅');
  }
  return graph;
};

const assertNoCycles = (graph: ReadonlyMap<string, ReadonlySet<string>>, start: string): void => {
  const temp = new Set<string>();
  const perm = new Set<string>();
  const pathStack: string[] = [];

  const dfs = (u: string): void => {
    if (perm.has(u)) return;
    if (temp.has(u)) {
      const idx = pathStack.lastIndexOf(u);
      const cyclePath = [...pathStack.slice(idx), u].join(' -> ');
      throw new Error(`Cycle detected between workspaces (prod deps): ${cyclePath}`);
    }
    temp.add(u);
    pathStack.push(u);
    for (const v of graph.get(u) ?? []) dfs(v);
    pathStack.pop();
    temp.delete(u);
    perm.add(u);
  };

  dfs(start);
};

// ---------- Reachable workspaces (closure) ----------

const collectWorkspaceClosure = (graph: ReadonlyMap<string, ReadonlySet<string>>, start: string): ReadonlySet<string> => {
  const visited = new Set<string>();
  const stack = [start];
  while (stack.length) {
    const u = stack.pop()!;
    if (visited.has(u)) continue;
    visited.add(u);
    for (const v of graph.get(u) ?? []) {
      stack.push(v);
    }
  }
  return visited;
};

// ---------- npm ls (prod) ----------

const npmLsJson = async (rootDir: string, workspace: string): Promise<TDependencyNode | undefined> =>
  new Promise((resolve, reject) => {
    const args = ['ls', '-w', workspace, '--json', '--omit=dev', '--all', '--long'];
    debugLog('spawn:', 'npm', args.join(' '), 'cwd:', rootDir);
    const child = spawn('npm', args, { cwd: rootDir, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += String(d)));
    child.stderr.on('data', (d) => (err += String(d)));
    child.on('close', (code) => {
      if (code !== 0 && !out) {
        return reject(new Error(`npm ls failed (code ${code}): ${err || 'unknown error'}`));
      }
      try {
        const json = JSON.parse(out) as any;
        const normPath = (o: any): string | undefined =>
          typeof o?.path === 'string' ? o.path : typeof o?.realpath === 'string' ? o.realpath : typeof o?.location === 'string' ? (path.isAbsolute(o.location) ? o.location : undefined) : undefined;

        const toNode = (name: string, o: any): TDependencyNode => ({
          name,
          version: typeof o?.version === 'string' ? o.version : '0.0.0',
          path: normPath(o),
          license: o?.license,
          repository: o?.repository,
          dependencies: o?.dependencies ? Object.fromEntries(Object.entries(o.dependencies).map(([k, v]) => [k, toNode(k, v)])) : undefined
        });

        const rootNode: TDependencyNode = {
          name: json?.name ?? workspace,
          version: json?.version ?? '0.0.0',
          path: normPath(json),
          license: json?.license,
          repository: json?.repository,
          dependencies: json?.dependencies ? Object.fromEntries(Object.entries(json.dependencies).map(([k, v]) => [k, toNode(k, v)])) : undefined
        };
        debugLog('npm ls parsed root:', rootNode.name, rootNode.version);
        resolve(rootNode);
      } catch (e) {
        reject(new Error(`Failed to parse npm ls JSON: ${(e as Error).message}\nRaw: ${out.slice(0, 2000)}`));
      }
    });
  });

// ---------- Collect third-party (with install paths) ----------

const collectThirdPartyMap = (root: TDependencyNode | undefined, wsNames: ReadonlySet<string>): ReadonlyMap<string, TCollected> => {
  const acc = new Map<string, TCollected>();
  if (!root || !root.dependencies) return acc;

  const visit = (node: TDependencyNode): void => {
    const isWorkspacePkg = wsNames.has(node.name);
    if (!isWorkspacePkg && node.version && node.version !== '0.0.0') {
      const id = `${node.name}@${node.version}`;
      const prev = acc.get(id);
      const installPath = node.path;
      if (!prev) {
        acc.set(id, { id, name: node.name, version: node.version, installPath });
      } else if (!prev.installPath && installPath) {
        acc.set(id, { ...prev, installPath });
      }
    }
    if (node.dependencies) {
      for (const child of Object.values(node.dependencies)) visit(child);
    }
  };

  for (const child of Object.values(root.dependencies)) visit(child);
  debugLog('third-party collected:', acc.size);
  return acc;
};

// ---------- Fallback: resolve missing install paths via Node resolver ----------

const resolvePackageDir = (pkgName: string, fromDir: string): string | undefined => {
  try {
    const req = createRequire(path.join(fromDir, 'package.json'));
    const p = req.resolve(`${pkgName}/package.json`);
    return path.dirname(p);
  } catch {
    return undefined;
  }
};

const fillMissingInstallPaths = (collected: Map<string, TCollected>, wsDir: string, rootDir: string): void => {
  let filled = 0;
  for (const [id, item] of collected) {
    if (!item.installPath) {
      const p = resolvePackageDir(item.name, wsDir) ?? resolvePackageDir(item.name, rootDir);
      if (p) {
        collected.set(id, { ...item, installPath: p });
        filled++;
      }
    }
  }
  debugLog('install paths filled via resolver:', filled);
};

// ---------- Read license from package folder ----------

const findLicenseFile = async (dir: string): Promise<string | undefined> => {
  try {
    const list = await fs.readdir(dir);
    const cand = list.find((f) => {
      const base = f.toLowerCase();
      return /^(license|licence|copying|unlicense|notice)(\..+)?$/.test(base);
    });
    return cand ? path.join(dir, cand) : undefined;
  } catch {
    return undefined;
  }
};

const parseSeeLicenseIn = (licenseField: unknown): string | undefined => {
  if (!licenseField) return undefined;
  const s = typeof licenseField === 'string' ? licenseField : typeof (licenseField as any)?.type === 'string' ? (licenseField as any).type : undefined;
  if (!s) return undefined;
  const m = /see\s+license\s+in\s+(.+)$/i.exec(s);
  return m?.[1]?.trim();
};

const tryReadLicenseText = async (pkgDir: string, licenseField: unknown): Promise<string | undefined> => {
  const see = parseSeeLicenseIn(licenseField);
  if (see) {
    const p = path.join(pkgDir, see);
    if (await exists(p)) {
      try {
        return await fs.readFile(p, 'utf8');
      } catch {
        /* ignore */
      }
    }
  }
  const lic = await findLicenseFile(pkgDir);
  if (lic) {
    try {
      return await fs.readFile(lic, 'utf8');
    } catch {
      /* ignore */
    }
  }
  return undefined;
};

const safeString = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined);

const normalizeLicenseValue = (licenseField: unknown): string | string[] => {
  if (!licenseField) return 'UNKNOWN';
  if (typeof licenseField === 'string') return licenseField;
  if (Array.isArray(licenseField)) {
    const arr = (licenseField as any[]).map((x) => (typeof x === 'string' ? x : typeof (x as any)?.type === 'string' ? (x as any).type : 'UNKNOWN'));
    return arr.length > 0 ? arr : 'UNKNOWN';
  }
  if (typeof licenseField === 'object') {
    const t = (licenseField as any)?.type;
    if (typeof t === 'string') return t;
  }
  return 'UNKNOWN';
};

const readPackageMeta = async (
  pkgDir: string
): Promise<{
  licenseField?: unknown;
  repository?: string;
  publisher?: string;
  email?: string;
  url?: string;
}> => {
  try {
    const pkg = await readJson<any>(path.join(pkgDir, 'package.json'));
    const repo = typeof pkg.repository === 'string' ? pkg.repository : typeof pkg.repository?.url === 'string' ? pkg.repository.url : undefined;
    return {
      licenseField: pkg.license ?? pkg.licenses,
      repository: repo,
      publisher: safeString(pkg.author?.name) ?? safeString(pkg.author) ?? undefined,
      email: safeString(pkg.author?.email) ?? undefined,
      url: safeString(pkg.homepage) ?? undefined
    };
  } catch {
    return {};
  }
};

const buildLicenseEntries = async (collected: ReadonlyMap<string, TCollected>): Promise<ReadonlyArray<TLicenseEntry>> => {
  const out: TLicenseEntry[] = [];
  for (const { id, name, version, installPath } of collected.values()) {
    let licenseText: string | undefined;
    let licenseType: string | string[] | undefined = 'UNKNOWN';
    let repository: string | undefined;
    let publisher: string | undefined;
    let email: string | undefined;
    let url: string | undefined;

    if (installPath) {
      const meta = await readPackageMeta(installPath);
      licenseType = normalizeLicenseValue(meta.licenseField);
      repository = meta.repository;
      publisher = meta.publisher;
      email = meta.email;
      url = meta.url;

      licenseText = await tryReadLicenseText(installPath, meta.licenseField);
    }

    out.push({
      id,
      name,
      version,
      licenses: licenseType as any,
      licenseText,
      repository,
      publisher,
      email,
      url,
      path: installPath
    });
  }

  out.sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  return out;
};

// ---------- Workspace license entries (NEW) ----------

const buildWorkspaceLicenseEntries = async (names: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>): Promise<ReadonlyArray<TLicenseEntry>> => {
  const entries: TLicenseEntry[] = [];
  for (const name of names) {
    const info = wsMap.get(name);
    if (!info) continue;
    const version = info.pkg.version ?? '0.0.0';
    const meta = await readPackageMeta(info.dir);
    const licenseType = normalizeLicenseValue(meta.licenseField);
    const licenseText = await tryReadLicenseText(info.dir, meta.licenseField);
    entries.push({
      id: `${name}@${version}`,
      name,
      version,
      licenses: licenseType,
      licenseText,
      repository: meta.repository,
      publisher: meta.publisher,
      email: meta.email,
      url: meta.url,
      path: info.dir
    });
  }
  entries.sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  return entries;
};

// ---------- Markdown ----------

const renderMarkdown = (workspaceLabel: string, items: ReadonlyArray<TLicenseEntry>): string => {
  const lines: string[] = [];
  lines.push(`# Third-Party Licenses
## Application: ${workspaceLabel}
Production dependencies (including transition dependencies): ${items.length}
`);

  for (const it of items) {
    const licenseStr = Array.isArray(it.licenses) ? it.licenses.join(', ') : String(it.licenses ?? 'UNKNOWN');
    lines.push(`---`, ``);
    lines.push(`## ${it.name}@${it.version}`);
    lines.push(`**License:** ${licenseStr}`);
    if (it.repository) lines.push(`**Repository:** ${it.repository}`);
    if (it.url) lines.push(`**URL:** ${it.url}`);
    if (it.publisher) lines.push(`**Publisher:** ${it.publisher}${it.email ? ` <${it.email}>` : ''}`);
    lines.push(``);
    if (it.licenseText) {
      lines.push(it.licenseText.trim(), ``);
    } else {
      lines.push(`_No license text file found; relying on package metadata._`, ``);
    }
  }
  return lines.join('\n');
};

// ---------- Resolve workspace from arg ----------

const resolveWorkspaceFromArg = (arg: string, workspaces: ReadonlyMap<string, TWorkspaceInfo>, rootDir: string): Readonly<{ wsName: string; wsDir: string }> => {
  const info = workspaces.get(arg);
  if (info) return { wsName: info.name, wsDir: info.dir };
  const asPath = path.isAbsolute(arg) ? arg : path.join(rootDir, arg);
  const normalized = path.resolve(asPath);
  for (const w of workspaces.values()) {
    if (path.resolve(w.dir) === normalized) return { wsName: w.name, wsDir: w.dir };
  }
  throw new Error(`Workspace "${arg}" not found. Use a workspace *name* (package.json:name) or a *path* to its directory (relative to monorepo root).`);
};

// ---------- Main ----------

const main = async (): Promise<void> => {
  const argv = await yargs(hideBin(process.argv))
    // .scriptName('anarchy-legal')
    .usage('$0 --workspace <name|path> --out <file> [--root <dir>] [--debug] [--no-include-workspaces]')
    .option('root', {
      type: 'string',
      describe: 'Starting directory to search for monorepo root. If omitted, uses INIT_CWD, then process.cwd(), then script dir.'
    })
    .option('workspace', {
      type: 'string',
      demandOption: true,
      describe: 'Target workspace (name from package.json or folder path relative to monorepo root)'
    })
    .option('out', {
      type: 'string',
      demandOption: true,
      describe: 'Output path for the result file (relative to current working dir)'
    })
    .option('debug', {
      type: 'boolean',
      default: false,
      describe: 'Print verbose diagnostic information'
    })
    .option('include-workspaces', {
      type: 'boolean',
      default: true,
      describe: 'Also include licenses of the target workspace and all reachable internal workspaces'
    })
    .help()
    .parseAsync();

  DEBUG = Boolean(argv.debug);

  // 1) Determine start points
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const startCandidates = [argv.root as string | undefined, process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];

  debugLog('start candidates:', startCandidates);

  // 2) Find monorepo root
  let monorepoRoot: string | undefined;
  for (const c of startCandidates) {
    try {
      const found = await findMonorepoRoot(c);
      monorepoRoot = found;
      debugLog('monorepo root picked:', found, '(from', c + ')');
      break;
    } catch (e) {
      debugLog('no root from', c, ':', (e as Error).message);
    }
  }
  if (!monorepoRoot) {
    throw new Error(`Failed to locate monorepo root from candidates: ${startCandidates.join(', ')}`);
  }

  // 3) Load root + workspaces
  const root = await loadRoot(monorepoRoot);
  debugLog('rootDir:', root.rootDir);

  // 4) Resolve workspace
  const { wsName, wsDir } = resolveWorkspaceFromArg(argv.workspace as string, root.workspaces, root.rootDir);
  debugLog('target workspace:', wsName, 'dir:', wsDir);

  // 5) Cycle check
  const graph = buildWsGraph(root.workspaces);
  assertNoCycles(graph, wsName);

  // 6) Resolved prod tree (for external deps)
  const tree = await npmLsJson(root.rootDir, wsName);

  // 7) Collect external packages WITH paths
  const thirdPartyMap = new Map(collectThirdPartyMap(tree, new Set(root.workspaces.keys())));
  // Fallback: resolve missing install paths via Node resolver
  fillMissingInstallPaths(thirdPartyMap, wsDir, root.rootDir);

  if (thirdPartyMap.size === 0) {
    console.warn(`[warn] No third-party production dependencies found for workspace "${wsName}".`);
  } else if (DEBUG) {
    const examples = [...thirdPartyMap.values()].slice(0, 5);
    console.log('[debug] examples (third-party):', examples);
  }

  // 8) Workspace licenses (NEW)
  let wsEntries: ReadonlyArray<TLicenseEntry> = [];
  if (argv['include-workspaces'] !== false) {
    const closure = collectWorkspaceClosure(graph, wsName);
    debugLog('workspace closure size:', closure.size, 'sample:', Array.from(closure).slice(0, 10));
    wsEntries = await buildWorkspaceLicenseEntries(closure, root.workspaces);
    debugLog('workspace license entries:', wsEntries.length);
  }

  // 9) Third-party licenses
  const thirdEntries = await buildLicenseEntries(thirdPartyMap);
  debugLog('third-party license entries:', thirdEntries.length);

  // 10) Merge & write
  const merged = [...wsEntries, ...thirdEntries];
  merged.sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));

  const outPath = path.isAbsolute(argv.out as string) ? (argv.out as string) : path.join(process.cwd(), argv.out as string);
  debugLog('write output to:', outPath, 'total entries:', merged.length);

  const md = renderMarkdown(wsName, merged);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, md, 'utf8');
  console.log(`The result file written to: ${outPath}`);
};

main().catch((e): void => {
  console.error(`✖ ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
