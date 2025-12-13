import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';
import * as checker from 'license-checker-rseidelsohn';
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
  dependencies?: Readonly<Record<string, TDependencyNode>>;
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

// ---------- Debug logger ----------
let DEBUG = false;
const dlog = (...args: ReadonlyArray<unknown>): void => {
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

/** Climb up from startDir until we find a package.json with "workspaces". */
const findMonorepoRoot = async (startDir: string): Promise<string> => {
  let dir = path.resolve(startDir);
  dlog('findMonorepoRoot: start at', dir);

  for (let i = 0; i < 50; i++) {
    const pkgPath = path.join(dir, 'package.json');
    dlog('  check', pkgPath);
    if (await exists(pkgPath)) {
      try {
        const pkg = await readJson<any>(pkgPath);
        if (hasWorkspacesField(pkg)) {
          dlog('  ✔ found workspaces at', pkgPath);
          return dir;
        }
      } catch (e) {
        dlog('  ! failed to parse', pkgPath, '-', (e as Error).message);
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

  dlog('workspaces patterns:', patterns);

  const dirs = await globby(patterns as string[], {
    cwd: rootDir,
    onlyDirectories: true,
    absolute: true,
    expandDirectories: false,
    gitignore: true,
    ignore: ['**/node_modules/**', '**/dist/**', '**/.*/**']
  });

  dlog('workspace dirs found:', dirs.length);

  const entries: Array<[string, TWorkspaceInfo]> = [];
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
  dlog('workspace packages loaded:', entries.length);

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
  for (const [name, info] of ws) {
    const deps = info.pkg.dependencies ?? {};
    const edges = new Set<string>();
    for (const depName of Object.keys(deps)) {
      if (names.has(depName)) edges.add(depName);
    }
    graph.set(name, edges);
  }
  if (DEBUG) {
    console.log('[debug] workspace graph:');
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

// ---------- npm ls (prod) ----------

const npmLsJson = async (rootDir: string, workspace: string): Promise<TDependencyNode | undefined> =>
  new Promise((resolve, reject) => {
    const args = ['ls', '-w', workspace, '--json', '--omit=dev', '--all'];
    dlog('spawn:', 'npm', args.join(' '), 'cwd:', rootDir);
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
        const toNode = (name: string, o: any): TDependencyNode => ({
          name,
          version: typeof o?.version === 'string' ? o.version : '0.0.0',
          dependencies: o?.dependencies ? Object.fromEntries(Object.entries(o.dependencies).map(([k, v]) => [k, toNode(k, v)])) : undefined
        });
        const rootNode: TDependencyNode = {
          name: json?.name ?? workspace,
          version: json?.version ?? '0.0.0',
          dependencies: json?.dependencies ? Object.fromEntries(Object.entries(json.dependencies).map(([k, v]) => [k, toNode(k, v)])) : undefined
        };
        dlog('npm ls parsed root:', rootNode.name, rootNode.version);
        resolve(rootNode);
      } catch (e) {
        reject(new Error(`Failed to parse npm ls JSON: ${(e as Error).message}\nRaw: ${out.slice(0, 2000)}`));
      }
    });
  });

const collectThirdPartySet = (root: TDependencyNode | undefined, wsNames: ReadonlySet<string>): ReadonlySet<string> => {
  const acc = new Set<string>();
  if (!root || !root.dependencies) return acc;
  const visit = (node: TDependencyNode): void => {
    const isWorkspacePkg = wsNames.has(node.name);
    if (!isWorkspacePkg && node.version && node.version !== '0.0.0') {
      acc.add(`${node.name}@${node.version}`);
    }
    if (node.dependencies) for (const child of Object.values(node.dependencies)) visit(child);
  };
  for (const child of Object.values(root.dependencies)) visit(child);
  dlog('third-party collected:', acc.size);
  return acc;
};

const getLicenses = async (rootDir: string, keep: ReadonlySet<string>): Promise<ReadonlyArray<TLicenseEntry>> =>
  new Promise((resolve, reject) => {
    checker.init({ start: rootDir, production: true, customPath: undefined, direct: false }, async (err: unknown, json: Record<string, any>) => {
      if (err) return reject(err instanceof Error ? err : new Error(String(err)));
      const entries: TLicenseEntry[] = [];
      for (const key of Object.keys(json)) {
        if (!keep.has(key)) continue;
        const it = json[key] ?? {};
        const licenseFile: string | undefined = typeof it.licenseFile === 'string' ? it.licenseFile : undefined;
        let licenseText: string | undefined;
        if (licenseFile) {
          try {
            licenseText = await fs.readFile(licenseFile, 'utf8');
          } catch {
            licenseText = undefined;
          }
        }
        const [name, version] = key.split('@').filter(Boolean);
        entries.push({
          id: key,
          name,
          version,
          licenses: it.licenses,
          licenseText,
          repository: it.repository,
          publisher: it.publisher,
          email: it.email,
          url: it.url,
          path: it.path
        });
      }
      entries.sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
      dlog('licenses filtered:', entries.length);
      resolve(entries);
    });
  });

const renderMarkdown = (workspaceLabel: string, items: ReadonlyArray<TLicenseEntry>): string => {
  const now = new Date().toISOString();
  const lines: string[] = [];
  lines.push(`# Third-Party Licenses`, ``);
  lines.push(`Generated: ${now}`);
  lines.push(`Workspace: \`${workspaceLabel}\``);
  lines.push(`Packages: ${items.length}`, ``);
  for (const it of items) {
    const licenseStr = Array.isArray(it.licenses) ? it.licenses.join(', ') : String(it.licenses ?? 'UNKNOWN');
    lines.push(`---`, ``);
    lines.push(`## ${it.name}@${it.version}`);
    lines.push(`**License:** ${licenseStr}`);
    if (it.repository) lines.push(`**Repository:** ${it.repository}`);
    if (it.url) lines.push(`**URL:** ${it.url}`);
    if (it.publisher) lines.push(`**Publisher:** ${it.publisher}${it.email ? ` <${it.email}>` : ''}`);
    if (it.path) lines.push(`**Path:** ${it.path}`);
    lines.push(``);
    if (it.licenseText) {
      lines.push(it.licenseText.trim(), ``);
    } else {
      lines.push(`_No license text file found; relying on package metadata._`, ``);
    }
  }
  lines.push(`---`, ``, `_Generated by Anarchy-legal._`);
  return lines.join('\n');
};

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

const main = async (): Promise<void> => {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('anarchy-legal')
    .usage('$0 --workspace <name|path> --out <file> [--root <dir>] [--debug]')
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
      describe: 'Output path for THIRD_PARTY_LICENSES.md (relative to current working dir)'
    })
    .option('debug', {
      type: 'boolean',
      default: false,
      describe: 'Print verbose diagnostic information'
    })
    .help()
    .parseAsync();

  DEBUG = Boolean(argv.debug);

  // 1) Determine start points
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const startCandidates = [argv.root as string | undefined, process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];

  dlog('start candidates:', startCandidates);

  // 2) Find monorepo root
  let monorepoRoot: string | undefined;
  for (const c of startCandidates) {
    try {
      const found = await findMonorepoRoot(c);
      monorepoRoot = found;
      dlog('monorepo root picked:', found, '(from', c + ')');
      break;
    } catch (e) {
      dlog('no root from', c, ':', (e as Error).message);
    }
  }
  if (!monorepoRoot) {
    throw new Error(`Failed to locate monorepo root from candidates: ${startCandidates.join(', ')}`);
  }

  // 3) Load root + workspaces
  const root = await loadRoot(monorepoRoot);
  dlog('rootDir:', root.rootDir);

  // 4) Resolve workspace
  const { wsName, wsDir } = resolveWorkspaceFromArg(argv.workspace as string, root.workspaces, root.rootDir);
  dlog('target workspace:', wsName, 'dir:', wsDir);

  // 5) Cycle check
  const graph = buildWsGraph(root.workspaces);
  assertNoCycles(graph, wsName);

  // 6) Resolved prod tree
  const tree = await npmLsJson(root.rootDir, wsName);

  // 7) Collect external packages
  const thirdPartySet = collectThirdPartySet(tree, new Set(root.workspaces.keys()));
  if (thirdPartySet.size === 0) {
    console.warn(`[warn] No third-party production dependencies found for workspace "${wsName}".`);
  }

  // 8) Licenses
  const licenses = await getLicenses(root.rootDir, thirdPartySet);

  // 9) Write output
  const outPath = path.isAbsolute(argv.out as string) ? (argv.out as string) : path.join(process.cwd(), argv.out as string);
  dlog('write output to:', outPath);

  const md = renderMarkdown(wsName, licenses);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, md, 'utf8');
  console.log(`✔ THIRD_PARTY_LICENSES.md written to: ${outPath}`);
};

main().catch((e) => {
  console.error(`✖ ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
