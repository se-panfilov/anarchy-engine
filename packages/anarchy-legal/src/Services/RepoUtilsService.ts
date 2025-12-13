import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

import type { TCollected, TDependencyNode, TLicenseEntry, TRepoUtilsService, TRootInfo, TWorkspaceInfo } from '@Anarchy/Legal/Models';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';

export function RepoUtilsService(): TRepoUtilsService {
  let isDebug: boolean = false;

  const setDebugMode = (debug: boolean): void => void (isDebug = debug);

  const readJson = async <T extends Record<string, unknown>>(p: string): Promise<T> => JSON.parse(await fs.readFile(p, 'utf8')) as T;

  const isExist = async (p: string): Promise<boolean> => {
    try {
      await fs.access(p);
      return true;
    } catch {
      return false;
    }
  };

  function debugLog(isDebug: boolean, ...args: ReadonlyArray<unknown>): void {
    if (isDebug) console.log('[debug]', ...args);
  }

  function hasWorkspacesField(pkg: any): boolean {
    const ws = pkg?.workspaces;
    if (!ws) return false;
    if (Array.isArray(ws)) return ws.length > 0;
    if (typeof ws === 'object' && Array.isArray(ws.packages)) return ws.packages.length > 0;
    return false;
  }

  async function findMonorepoRoot(startDir: string): Promise<string> {
    const start: string = path.resolve(startDir);
    debugLog(isDebug, 'findMonorepoRoot: start at', start);

    const searchUp = async (dir: string, depth: number): Promise<string | undefined> => {
      if (depth > 50) return undefined;
      const pkgPath: string = path.join(dir, 'package.json');
      debugLog(isDebug, '  check', pkgPath);
      if (await isExist(pkgPath)) {
        try {
          const pkg = await readJson<any>(pkgPath);
          if (hasWorkspacesField(pkg)) {
            debugLog(isDebug, ' found workspaces at', pkgPath);
            return dir;
          }
        } catch (e) {
          debugLog(isDebug, '  ! failed to parse', pkgPath, '-', (e as Error).message);
        }
      }
      const parent: string = path.dirname(dir);
      if (parent === dir) return undefined;
      return searchUp(parent, depth + 1);
    };

    const found: string | undefined = await searchUp(start, 0);
    if (!found) throw new Error(`Monorepo root not found starting from "${startDir}". Provide --root explicitly pointing to a package.json with "workspaces".`);
    return found;
  }

  async function loadRoot(rootDir: string): Promise<TRootInfo> {
    const rootPkgPath: string = path.join(rootDir, 'package.json');
    if (!(await isExist(rootPkgPath))) throw new Error(`Root package.json not found at: ${rootPkgPath}`);

    const rootPkg: TRootInfo['rootPkg'] = await readJson<TRootInfo['rootPkg']>(rootPkgPath);
    const wsField = rootPkg.workspaces;
    if (!wsField) throw new Error(`"workspaces" not found in root package.json at ${rootPkgPath}`);

    const patterns: ReadonlyArray<string> = Array.isArray(wsField) ? wsField : ((wsField as any).packages ?? []);
    if (patterns.length === 0) throw new Error(`"workspaces" has no packages in ${rootPkgPath}`);

    debugLog(isDebug, 'workspaces patterns:', patterns);

    // eslint-disable-next-line spellcheck/spell-checker
    const dirs: ReadonlyArray<string> = await globby(patterns, {
      cwd: rootDir,
      onlyDirectories: true,
      absolute: true,
      expandDirectories: false,
      gitignore: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/dist-*/**', '**/.*/**']
    });

    debugLog(isDebug, 'workspace dirs found:', dirs.length);

    const entries: Array<[string, TWorkspaceInfo]> = (
      await Promise.all(
        dirs.map(async (dir: string): Promise<[string, TWorkspaceInfo] | undefined> => {
          const pkgPath: string = path.join(dir, 'package.json');
          if (!(await isExist(pkgPath))) return undefined;
          const pkg = await readJson<TWorkspaceInfo['pkg']>(pkgPath);
          if (!pkg.name) return undefined;
          return [
            pkg.name,
            {
              name: pkg.name,
              dir,
              pkgPath,
              pkg
            }
          ];
        })
      )
    ).filter(Boolean) as Array<[string, TWorkspaceInfo]>;

    debugLog(isDebug, 'workspace packages loaded:', entries.length);

    if (entries.length === 0) throw new Error(`No workspace package.json files found by patterns: ${patterns.join(', ')}`);

    return {
      rootDir,
      rootPkgPath,
      rootPkg,
      workspaces: new Map(entries)
    };
  }

  function buildWsGraph(ws: ReadonlyMap<string, TWorkspaceInfo>): ReadonlyMap<string, ReadonlySet<string>> {
    const names: Set<string> = new Set(ws.keys());
    const graph = Array.from(ws.entries()).reduce((acc, [name, info]) => {
      const deps: Record<string, string> = info.pkg.dependencies ?? {};
      const edges: Set<string> = new Set<string>(Object.keys(deps).filter((dependencyName) => names.has(dependencyName)));
      acc.set(name, edges);
      return acc;
    }, new Map<string, ReadonlySet<string>>());

    if (isDebug) {
      console.log('[debug] workspace graph:');
      graph.forEach((v: ReadonlySet<string>, k: string) => console.log('  ', k, '->', [...v].join(', ') || '∅'));
    }
    return graph;
  }

  function assertNoCycles(graph: ReadonlyMap<string, ReadonlySet<string>>, start: string): void {
    const temp: Set<string> = new Set<string>();
    const perm: Set<string> = new Set<string>();
    let pathStack: ReadonlyArray<string> = [];

    // eslint-disable-next-line spellcheck/spell-checker
    const dfs = (u: string): void => {
      if (perm.has(u)) return;
      if (temp.has(u)) {
        const idx: number = pathStack.lastIndexOf(u);
        const cyclePath: string = [...pathStack.slice(idx), u].join(' -> ');
        throw new Error(`Cycle detected between workspaces (prod deps): ${cyclePath}`);
      }
      temp.add(u);
      pathStack = [...pathStack];
      // eslint-disable-next-line spellcheck/spell-checker
      (graph.get(u) ?? new Set<string>()).forEach(dfs);
      pathStack = pathStack.slice(0, pathStack.length - 1);
      temp.delete(u);
      perm.add(u);
    };

    // eslint-disable-next-line spellcheck/spell-checker
    dfs(start);
  }

  function collectWorkspaceClosure(graph: ReadonlyMap<string, ReadonlySet<string>>, start: string): ReadonlySet<string> {
    const visited: Set<string> = new Set<string>();

    const visit = (u: string): void => {
      if (visited.has(u)) return;
      visited.add(u);
      (graph.get(u) ?? new Set<string>()).forEach(visit);
    };

    visit(start);
    return visited;
  }

  async function npmLsJson(rootDir: string, workspace: string): Promise<TDependencyNode | undefined> {
    return new Promise((resolve, reject): void => {
      const args: ReadonlyArray<string> = ['ls', '-w', workspace, '--json', '--omit=dev', '--all', '--long'];
      debugLog(isDebug, 'spawn:', 'npm', args.join(' '), 'cwd:', rootDir);
      const child = spawn('npm', args, { cwd: rootDir, stdio: ['ignore', 'pipe', 'pipe'] });
      let out: string = '';
      let err: string = '';
      child.stdout.on('data', (d) => (out += String(d)));
      child.stderr.on('data', (d) => (err += String(d)));
      child.on('close', (code: number | null): void => {
        if (code !== 0 && !out) return reject(new Error(`npm ls failed (code ${code}): ${err || 'unknown error'}`));

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
          return resolve(rootNode);
        } catch (e) {
          return reject(new Error(`Failed to parse npm ls JSON: ${(e as Error).message}\nRaw: ${out.slice(0, 2000)}`));
        }
      });
    });
  }

  function collectExternalSeedNames(closure: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>, wsNames: ReadonlySet<string>): ReadonlySet<string> {
    const seeds: Set<string> = new Set<string>();
    [...closure].forEach((wsName: string): void => {
      const info: TWorkspaceInfo | undefined = wsMap.get(wsName);
      if (!info) return;
      const deps: Record<string, string> = info.pkg.dependencies ?? {};
      Object.keys(deps).forEach((dependencyName: string): void => {
        if (!wsNames.has(dependencyName)) seeds.add(dependencyName);
      });
    });
    return seeds;
  }

  function collectThirdPartyMap(root: TDependencyNode | undefined, wsNames: ReadonlySet<string>, seedNames: ReadonlySet<string>): ReadonlyMap<string, TCollected> {
    const acc: Map<string, TCollected> = new Map<string, TCollected>();
    if (!root || !root.dependencies) return acc;
    if (seedNames.size === 0) return acc;

    const visit = (node: TDependencyNode, inside: boolean): void => {
      const isWs: boolean = wsNames.has(node.name);
      const nowInside: boolean = inside || seedNames.has(node.name);

      if (nowInside && !isWs && node.version && node.version !== '0.0.0') {
        const id: string = `${node.name}@${node.version}`;
        const prev: TCollected | undefined = acc.get(id);
        const installPath: string | undefined = node.path;
        if (!prev) acc.set(id, { id, name: node.name, version: node.version, installPath });
        else if (!prev.installPath && installPath) acc.set(id, { ...prev, installPath });
      }
      if (node.dependencies) Object.values(node.dependencies).forEach((child) => visit(child, nowInside));
    };

    Object.values(root.dependencies).forEach((child: TDependencyNode) => visit(child, false));

    debugLog(isDebug, 'third-party collected (seed-filtered):', acc.size);
    return acc;
  }

  function resolvePackageDir(pkgName: string, fromDir: string): string | undefined {
    try {
      const req: NodeJS.Require = createRequire(path.join(fromDir, 'package.json'));
      const p: string = req.resolve(`${pkgName}/package.json`);
      return path.dirname(p);
    } catch {
      return undefined;
    }
  }

  function fillMissingInstallPaths(collected: Map<string, TCollected>, wsDir: string, rootDir: string): void {
    let filled: number = 0;
    Array.from(collected.entries()).forEach(([id, item]): void => {
      if (!item.installPath) {
        const p: string | undefined = resolvePackageDir(item.name, wsDir) ?? resolvePackageDir(item.name, rootDir);
        if (p) {
          collected.set(id, { ...item, installPath: p });
          filled++;
        }
      }
    });
    debugLog(isDebug, 'install paths filled via resolver:', filled);
  }

  async function findLicenseFile(dir: string): Promise<string | undefined> {
    try {
      const list: Array<string> = await fs.readdir(dir);
      const c: string | undefined = list.find((f: string) => {
        const base: string = f.toLowerCase();
        return /^(license|licence|copying|unlicense|notice)(\..+)?$/.test(base);
      });
      return c ? path.join(dir, c) : undefined;
    } catch {
      return undefined;
    }
  }

  function parseSeeLicenseIn(licenseField: unknown): string | undefined {
    if (!licenseField) return undefined;
    const s = typeof licenseField === 'string' ? licenseField : typeof (licenseField as any)?.type === 'string' ? (licenseField as any).type : undefined;
    if (!s) return undefined;
    const m: RegExpExecArray | null = /see\s+license\s+in\s+(.+)$/i.exec(s);
    return m?.[1]?.trim();
  }

  async function tryReadLicenseText(pkgDir: string, licenseField: unknown): Promise<string | undefined> {
    const see: string | undefined = parseSeeLicenseIn(licenseField);
    if (see) {
      const p: string = path.join(pkgDir, see);
      if (await isExist(p)) {
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
  }

  const safeString = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined);

  function normalizeLicenseValue(licenseField: unknown): string | ReadonlyArray<string> {
    if (!licenseField) return 'UNKNOWN';
    if (typeof licenseField === 'string') return licenseField;
    if (Array.isArray(licenseField)) {
      const arr: any[] = (licenseField as any[]).map((x) => (typeof x === 'string' ? x : typeof (x as any)?.type === 'string' ? (x as any).type : 'UNKNOWN'));
      return arr.length > 0 ? arr : 'UNKNOWN';
    }
    if (typeof licenseField === 'object') {
      const t = (licenseField as any)?.type;
      if (typeof t === 'string') return t;
    }
    return 'UNKNOWN';
  }

  async function readPackageMeta(pkgDir: string): Promise<{
    licenseField?: unknown;
    repository?: string;
    publisher?: string;
    email?: string;
    url?: string;
  }> {
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
  }

  async function buildLicenseEntries(collected: ReadonlyMap<string, TCollected>): Promise<ReadonlyArray<TLicenseEntry>> {
    const list = await Promise.all(
      Array.from(collected.values()).map(async ({ id, name, version, installPath }) => {
        let licenseText: string | undefined;
        let licenseType: string | ReadonlyArray<string> | undefined = 'UNKNOWN';
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

        return {
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
        } satisfies TLicenseEntry;
      })
    );

    return [...list].sort((a, b): number => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  }

  async function buildWorkspaceLicenseEntries(names: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>, excludeName?: string): Promise<ReadonlyArray<TLicenseEntry>> {
    const filtered: any[] = [...names].filter((name) => !(excludeName && name === excludeName));
    const entries = await Promise.all(
      filtered
        .map((name: string) => wsMap.get(name))
        // eslint-disable-next-line functional/prefer-tacit
        .filter((info: TWorkspaceInfo | undefined): info is TWorkspaceInfo => Boolean(info))
        .map(async (info) => {
          const version: string = info.pkg.version ?? '0.0.0';
          const meta = await readPackageMeta(info.dir);
          const licenseType: string | ReadonlyArray<string> = normalizeLicenseValue(meta.licenseField);
          const licenseText: string | undefined = await tryReadLicenseText(info.dir, meta.licenseField);
          return {
            id: `${info.name}@${version}`,
            name: info.name,
            version,
            licenses: licenseType,
            licenseText,
            repository: meta.repository,
            publisher: meta.publisher,
            email: meta.email,
            url: meta.url,
            path: info.dir
          } satisfies TLicenseEntry;
        })
    );
    return [...entries].sort((a, b): number => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  }

  function renderMarkdown(workspaceLabel: string, items: ReadonlyArray<TLicenseEntry>, emptyNote?: string): string {
    const header: ReadonlyArray<string> = [`# Third-Party Licenses`, `## Application: ${workspaceLabel}`, `Production dependencies (including transition dependencies): ${items.length}`, ``];
    const note: ReadonlyArray<string> = items.length === 0 && emptyNote ? [`**Note:** ${emptyNote}`, ``] : [];

    const body: ReadonlyArray<string> = items.flatMap((it) => {
      const licenseStr: string = Array.isArray(it.licenses) ? it.licenses.join(', ') : String(it.licenses ?? 'UNKNOWN');
      return [
        `---`,
        ``,
        `## ${it.name}@${it.version}`,
        `**License:** ${licenseStr}\n`,
        ...(it.repository ? [`**Repository:** ${it.repository}\n`] : []),
        ...(it.url ? [`**URL:** ${it.url}\n`] : []),
        ...(it.publisher ? [`**Publisher:** ${it.publisher}${it.email ? ` <${it.email}>` : ''}\n`] : []),
        ``,
        ...(it.licenseText ? [it.licenseText.trim(), ``] : [`_No license text file found; relying on package metadata._`, ``])
      ];
    });

    return [...header, ...note, ...body].join('\n');
  }

  function resolveWorkspaceFromArg(arg: string, workspaces: ReadonlyMap<string, TWorkspaceInfo>, rootDir: string): TWorkspaceInfo {
    const info: TWorkspaceInfo | undefined = workspaces.get(arg);
    if (info) return info;
    const asPath: string = path.isAbsolute(arg) ? arg : path.join(rootDir, arg);
    const normalized: string = path.resolve(asPath);
    const found: TWorkspaceInfo | undefined = [...workspaces.values()].find((w: TWorkspaceInfo): boolean => path.resolve(w.dir) === normalized);
    if (found) return { ...found, name: found.name, dir: found.dir };
    throw new Error(`Workspace "${arg}" not found. Use a workspace *name* (package.json:name) or a *path* to its directory (relative to monorepo root).`);
  }

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
    isExist,
    loadRoot,
    npmLsJson,
    renderMarkdown,
    resolveWorkspaceFromArg,
    setDebugMode,
    readJson
  };
}
