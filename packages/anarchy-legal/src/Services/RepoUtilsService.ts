import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

import type { TCollected, TDependencyNode, TLicenseEntry, TRepoUtilsService, TRootInfo, TWorkspaceInfo } from '@Anarchy/Legal/Models';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';

export function RepoUtilsService(isDebug: boolean): TRepoUtilsService {
  const readJson = async <T extends Record<string, unknown>>(p: string): Promise<T> => JSON.parse(await fs.readFile(p, 'utf8')) as T;

  const exists = async (p: string): Promise<boolean> => {
    try {
      await fs.access(p);
      return true;
    } catch {
      return false;
    }
  };

  const debugLog = (isDebug: boolean, ...args: ReadonlyArray<unknown>): void => {
    if (isDebug) console.log('[debug]', ...args);
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
    debugLog(isDebug, 'findMonorepoRoot: start at', dir);

    // eslint-disable-next-line functional/no-loop-statements
    for (let i = 0; i < 50; i++) {
      const pkgPath = path.join(dir, 'package.json');
      debugLog(isDebug, '  check', pkgPath);
      if (await exists(pkgPath)) {
        try {
          const pkg = await readJson<any>(pkgPath);
          if (hasWorkspacesField(pkg)) {
            debugLog(isDebug, '  ✔ found workspaces at', pkgPath);
            return dir;
          }
        } catch (e) {
          debugLog(isDebug, '  ! failed to parse', pkgPath, '-', (e as Error).message);
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
    const patterns: ReadonlyArray<string> = Array.isArray(wsField) ? wsField : (wsField.packages ?? []);
    if (patterns.length === 0) {
      throw new Error(`"workspaces" has no packages in ${rootPkgPath}`);
    }

    debugLog(isDebug, 'workspaces patterns:', patterns);

    // eslint-disable-next-line spellcheck/spell-checker
    const dirs = await globby(patterns as string[], {
      cwd: rootDir,
      onlyDirectories: true,
      absolute: true,
      expandDirectories: false,
      gitignore: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/.*/**']
    });

    debugLog(isDebug, 'workspace dirs found:', dirs.length);

    const entries: Array<[string, TWorkspaceInfo]> = [];
    // eslint-disable-next-line functional/no-loop-statements
    for (const dir of dirs) {
      const pkgPath = path.join(dir, 'package.json');
      if (!(await exists(pkgPath))) continue;
      const pkg = await readJson<TWorkspaceInfo['pkg']>(pkgPath);
      if (!pkg.name) continue;
      // eslint-disable-next-line functional/immutable-data
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
    debugLog(isDebug, 'workspace packages loaded:', entries.length);

    if (entries.length === 0) throw new Error(`No workspace package.json files found by patterns: ${patterns.join(', ')}`);

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
      for (const dependencyName of Object.keys(deps)) {
        if (names.has(dependencyName)) edges.add(dependencyName);
      }
      graph.set(name, edges);
    }
    if (isDebug) {
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
    const visited: Set<string> = new Set<string>();
    const stack: Array<string> = [start];
    // eslint-disable-next-line functional/no-loop-statements
    while (stack.length) {
      // eslint-disable-next-line functional/immutable-data
      const u = stack.pop()!;
      if (visited.has(u)) continue;
      visited.add(u);
      // eslint-disable-next-line functional/no-loop-statements
      for (const v of graph.get(u) ?? []) {
        // eslint-disable-next-line functional/immutable-data
        stack.push(v);
      }
    }
    return visited;
  };

  // ---------- npm ls (prod) ----------

  const npmLsJson = async (rootDir: string, workspace: string): Promise<TDependencyNode | undefined> =>
    new Promise((resolve, reject) => {
      const args = ['ls', '-w', workspace, '--json', '--omit=dev', '--all', '--long'];
      debugLog(isDebug, 'spawn:', 'npm', args.join(' '), 'cwd:', rootDir);
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
            // eslint-disable-next-line spellcheck/spell-checker
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
          debugLog(isDebug, 'npm ls parsed root:', rootNode.name, rootNode.version);
          resolve(rootNode);
        } catch (e) {
          reject(new Error(`Failed to parse npm ls JSON: ${(e as Error).message}\nRaw: ${out.slice(0, 2000)}`));
        }
      });
    });

  // ---------- Seeds from package.json ----------

  const collectExternalSeedNames = (closure: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>, wsNames: ReadonlySet<string>): ReadonlySet<string> => {
    const seeds = new Set<string>();
    for (const wsName of closure) {
      const info = wsMap.get(wsName);
      if (!info) continue;
      const deps = info.pkg.dependencies ?? {};
      for (const dependencyName of Object.keys(deps)) {
        if (!wsNames.has(dependencyName)) seeds.add(dependencyName);
      }
    }
    return seeds;
  };

  // ---------- Collect third-party (with install paths) ----------

  const collectThirdPartyMap = (root: TDependencyNode | undefined, wsNames: ReadonlySet<string>, seedNames: ReadonlySet<string>): ReadonlyMap<string, TCollected> => {
    const acc = new Map<string, TCollected>();
    if (!root || !root.dependencies) return acc;
    if (seedNames.size === 0) return acc;

    const visit = (node: TDependencyNode, inside: boolean): void => {
      const isWs = wsNames.has(node.name);
      const nowInside = inside || seedNames.has(node.name);

      if (nowInside && !isWs && node.version && node.version !== '0.0.0') {
        const id = `${node.name}@${node.version}`;
        const prev = acc.get(id);
        const installPath = node.path;
        if (!prev) acc.set(id, { id, name: node.name, version: node.version, installPath });
        else if (!prev.installPath && installPath) acc.set(id, { ...prev, installPath });
      }
      // eslint-disable-next-line functional/no-loop-statements
      if (node.dependencies) for (const child of Object.values(node.dependencies)) visit(child, nowInside);
    };

    // eslint-disable-next-line functional/no-loop-statements
    for (const child of Object.values(root.dependencies)) visit(child, false);

    debugLog(isDebug, 'third-party collected (seed-filtered):', acc.size);
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
    // eslint-disable-next-line functional/no-loop-statements
    for (const [id, item] of collected) {
      if (!item.installPath) {
        const p = resolvePackageDir(item.name, wsDir) ?? resolvePackageDir(item.name, rootDir);
        if (p) {
          collected.set(id, { ...item, installPath: p });
          filled++;
        }
      }
    }
    debugLog(isDebug, 'install paths filled via resolver:', filled);
  };

  // ---------- Read license from package folder ----------

  const findLicenseFile = async (dir: string): Promise<string | undefined> => {
    try {
      const list: Array<string> = await fs.readdir(dir);
      const c = list.find((f: string) => {
        const base: string = f.toLowerCase();
        return /^(license|licence|copying|unlicense|notice)(\..+)?$/.test(base);
      });
      return c ? path.join(dir, c) : undefined;
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
    const license: string | undefined = await findLicenseFile(pkgDir);
    if (license) {
      try {
        return await fs.readFile(license, 'utf8');
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
    // eslint-disable-next-line functional/no-loop-statements
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

      // eslint-disable-next-line functional/immutable-data
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

    // eslint-disable-next-line functional/immutable-data
    out.sort((a, b): number => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
    return out;
  };

  // ---------- Workspace license entries ----------

  const buildWorkspaceLicenseEntries = async (names: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>, excludeName?: string): Promise<ReadonlyArray<TLicenseEntry>> => {
    const entries: TLicenseEntry[] = [];
    for (const name of names) {
      if (excludeName && name === excludeName) continue;
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

  const renderMarkdown = (workspaceLabel: string, items: ReadonlyArray<TLicenseEntry>, emptyNote?: string): string => {
    const lines: string[] = [];
    lines.push(`# Third-Party Licenses
## Application: ${workspaceLabel}
Production dependencies (including transition dependencies): ${items.length}
`);

    if (items.length === 0 && emptyNote) {
      lines.push(`**Note:** ${emptyNote}`, ``);
    }

    for (const it of items) {
      const licenseStr = Array.isArray(it.licenses) ? it.licenses.join(', ') : String(it.licenses ?? 'UNKNOWN');
      lines.push(`---`, ``);
      lines.push(`## ${it.name}@${it.version}`);
      lines.push(`**License:** ${licenseStr}\n`);
      if (it.repository) lines.push(`**Repository:** ${it.repository}\n`);
      if (it.url) lines.push(`**URL:** ${it.url}\n`);
      if (it.publisher) lines.push(`**Publisher:** ${it.publisher}${it.email ? ` <${it.email}>` : ''}\n`);
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

  return {
    assertNoCycles,
    buildLicenseEntries,
    buildWorkspaceLicenseEntries,
    buildWsGraph,
    collectExternalSeedNames,
    collectThirdPartyMap,
    collectWorkspaceClosure,
    debugLog,
    fillMissingInstallPaths,
    findMonorepoRoot,
    loadRoot,
    npmLsJson,
    renderMarkdown,
    resolveWorkspaceFromArg
  };
}
