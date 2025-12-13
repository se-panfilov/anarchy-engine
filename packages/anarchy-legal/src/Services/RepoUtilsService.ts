import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

import type {
  TAnarchyLegalConfig,
  TAnarchyLegalConfigEntry,
  TCollected,
  TDateMessage,
  TDependencyNode,
  TLegalDocumentType,
  TLicenseEntry,
  TRenderInput,
  TRepoUtilsService,
  TRootInfo,
  TTemplateGeneratorOptions,
  TTemplateMessages,
  TWorkspaceInfo
} from '@Anarchy/Legal/Models';
import { isValid, parseISO } from 'date-fns';
import { format as dfFormat } from 'date-fns/format';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';

import { LegalDocumentType } from '../Constants/LegalDocumentType.ts';

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

  async function loadWorkspaces(rootDir: string): Promise<ReadonlyMap<string, TWorkspaceInfo>> {
    const rootPkg = await readJson<any>(path.join(rootDir, 'package.json'));
    const patterns: string[] = Array.isArray(rootPkg.workspaces) ? rootPkg.workspaces : (rootPkg.workspaces?.packages ?? []);
    if (!patterns.length) throw new Error(`No workspaces patterns in ${path.join(rootDir, 'package.json')}`);
    // eslint-disable-next-line spellcheck/spell-checker
    const dirs = await globby(patterns, {
      cwd: rootDir,
      absolute: true,
      onlyDirectories: true,
      gitignore: true,
      ignore: ['**/node_modules/**', '**/dist/**', '**/dist-*/**', '**/.*/**']
    });
    const entries = (
      await Promise.all(
        dirs.map(async (dir): Promise<[string, TWorkspaceInfo] | undefined> => {
          const pkgPath: string = path.join(dir, 'package.json');
          if (!(await isExist(pkgPath))) return undefined;
          const pkg = await readJson<{
            name: string;
            version?: string;
            dependencies?: Record<string, string>;
            devDependencies?: Record<string, string>;
            optionalDependencies?: Record<string, string>;
          }>(pkgPath);
          const name: string | undefined = typeof pkg.name === 'string' ? pkg.name : undefined;
          return name ? ([name, { name, dir, pkgPath, pkg }] as const) : undefined;
        })
      )
    ).filter(Boolean) as Array<[string, TWorkspaceInfo]>;
    return new Map(entries);
  }

  async function readConfig(wsDir: string): Promise<TAnarchyLegalConfig> | never {
    const p = path.join(wsDir, '.anarchy-legal.config.json');
    if (!(await isExist(p))) return [];
    try {
      const json: TAnarchyLegalConfig | unknown = await readJson<Record<string, unknown>>(p);
      if (!Array.isArray(json)) throw new Error('config root must be an array');
      // very light validation
      return json.filter(Boolean) as TAnarchyLegalConfig;
    } catch (e) {
      throw new Error(`Failed to read ${p}: ${(e as Error).message}`);
    }
  }

  const pickEntry = (config: TAnarchyLegalConfig, type: 'GENERIC' | TLegalDocumentType): TAnarchyLegalConfigEntry | undefined =>
    config.find((e: TAnarchyLegalConfigEntry): boolean => e?.type === type);

  async function findTemplateFile(
    templatesDir: string,
    docType: TLegalDocumentType,
    { templateExtension, defaultTemplateBaseName }: TTemplateGeneratorOptions,
    desiredBase?: string
  ): Promise<string | undefined> {
    // 1) exact by desiredBase
    if (desiredBase) {
      const exact: string = path.join(templatesDir, `${desiredBase}${templateExtension}`);
      if (await isExist(exact)) return exact;
    }
    // 2) default <TYPE>_TEMPLATE.md
    const def = path.join(templatesDir, `${defaultTemplateBaseName(docType)}${templateExtension}`);
    if (await isExist(def)) return def;
    // 3) first match <TYPE>_*_TEMPLATE.md (alphabetically)
    const pattern: string = path.join(templatesDir, `${docType}_*${templateExtension}`);
    // eslint-disable-next-line spellcheck/spell-checker
    const found: string[] = await globby([pattern], { absolute: true });
    const [first] = found.toSorted();
    return first;
  }

  const PLACEHOLDER_RE = /{{\s*([A-Z0-9_]+)\s*}}/g;

  /** Parse date string with date-fns (supports "now", ISO, and Date constructor fallback) */
  const formatWithDateFns = (dateStr: string, format: string): string => {
    const d: Date =
      dateStr.toLowerCase() === 'now'
        ? new Date()
        : ((): Date => {
            const iso: Date = parseISO(dateStr);
            return isValid(iso) ? iso : new Date(dateStr);
          })();
    if (!isValid(d)) return ''; // invalid date → empty
    try {
      return dfFormat(d, format);
    } catch {
      return '';
    }
  };

  // Convert message value (string | {date,format}) -> string
  function materializeMessage(v: unknown): string {
    if (typeof v === 'string') return v;
    if (v && typeof v === 'object' && 'date' in (v as any) && 'format' in (v as any)) {
      const { date, format } = v as TDateMessage;
      if (typeof date === 'string' && typeof format === 'string') {
        return formatWithDateFns(date, format);
      }
    }
    return '';
  }

  // Extract placeholders present in a template text
  function collectPlaceholders(tpl: string): ReadonlySet<string> {
    return new Set<string>([...tpl.matchAll(PLACEHOLDER_RE)].map((m) => m[1] as string));
  }

  // PACKAGE_* resolution from package.json
  function packagePlaceholder(key: string, pkg: Readonly<Record<string, unknown>>): string | undefined {
    // key is suffix after "PACKAGE_", e.g. NAME, VERSION, AUTHOR, AUTHORS, LICENSE, REPOSITORY, HOMEPAGE, BUGS_URL, DESCRIPTION
    const k: string = key.toUpperCase();

    const str = (v: unknown): string | undefined => (typeof v === 'string' ? v : undefined);
    const arrStr = (v: unknown): string | undefined => (Array.isArray(v) ? (v as unknown[]).map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(', ') : undefined);

    function authorToString(a: unknown): string | undefined {
      if (!a) return undefined;
      if (typeof a === 'string') return a;
      if (typeof a === 'object') {
        const n: string = str((a as any).name) ?? '';
        const e: string | undefined = str((a as any).email);
        const w: string | undefined = str((a as any).url);
        return [n, e ? `<${e}>` : '', w ? `(${w})` : ''].filter(Boolean).join(' ').trim();
      }
      return undefined;
    }

    switch (k) {
      case 'NAME':
        return str(pkg.name);
      case 'VERSION':
        return str(pkg.version);
      case 'DESCRIPTION':
        return str(pkg.description);
      case 'HOMEPAGE':
        return str(pkg.homepage);
      case 'LICENSE':
        return str(pkg.license);
      case 'REPOSITORY': {
        const repo = (pkg as any).repository;
        if (typeof repo === 'string') return repo;
        const url: string | undefined = str(repo?.url);
        return url ?? undefined;
      }
      case 'BUGS_URL': {
        const bugs = (pkg as any).bugs;
        if (typeof bugs === 'string') return bugs;
        const url = str(bugs?.url);
        return url ?? undefined;
      }
      case 'AUTHOR':
        return authorToString((pkg as any).author);
      case 'AUTHORS':
        return arrStr((pkg as any).authors);
      case 'KEYWORDS':
        return arrStr((pkg as any).keywords);
      default: {
        // if someone uses {{PACKAGE_FOO_BAR}}, try a naive lower-cased lookup "foo_bar" then "fooBar"
        const direct = (pkg as any)[key.toLowerCase()];
        if (typeof direct === 'string') return direct;
        return undefined;
      }
    }
  }

  // Build final map for a given doc type
  function buildPlaceholderValues(
    _docType: TLegalDocumentType,
    tplText: string,
    pkg: Readonly<Record<string, unknown>>,
    generic: TTemplateMessages | undefined,
    specific: TTemplateMessages | undefined
  ): Readonly<Record<string, string>> {
    const names: ReadonlySet<string> = collectPlaceholders(tplText);

    const pkgValues: Record<string, string> = Array.from(names).reduce<Record<string, string>>((acc, name) => {
      if (!name.startsWith('PACKAGE_')) return acc;
      const suffix: string = name.slice('PACKAGE_'.length);
      const v: string | undefined = packagePlaceholder(suffix, pkg);
      return v !== undefined ? { ...acc, [name]: v } : acc;
    }, {});

    const genericValues: Record<string, string> = generic ? Object.fromEntries(Object.entries(generic).map(([k, v]) => [k, materializeMessage(v)])) : {};

    const specificValues: Record<string, string> = specific ? Object.fromEntries(Object.entries(specific).map(([k, v]) => [k, materializeMessage(v)])) : {};

    return { ...pkgValues, ...genericValues, ...specificValues };
  }

  // Render
  function renderTemplate(tpl: string, values: Readonly<Record<string, string>>, onMissing: (name: string) => void): string {
    return tpl.replace(PLACEHOLDER_RE, (_m, g1: string): string => {
      const v: string = values[g1];
      if (v === undefined) {
        onMissing(g1);
        return '';
      }
      return v;
    });
  }

  async function generateForType(renderInput: TRenderInput, docType: TLegalDocumentType, options: TTemplateGeneratorOptions): Promise<void> {
    const genericConfig: TAnarchyLegalConfigEntry | undefined = pickEntry(renderInput.config, 'GENERIC');
    const specificConfig: TAnarchyLegalConfigEntry | undefined = pickEntry(renderInput.config, docType);
    const desiredBase: string | undefined = specificConfig?.template;

    const tplPath: string | undefined = await findTemplateFile(renderInput.templatesDir, docType, options, desiredBase);
    if (!tplPath) {
      console.warn(`[warn] No template found for ${docType}. Skipping.`);
      return;
    }

    const tplText: string = await fs.readFile(tplPath, 'utf8');
    const values = buildPlaceholderValues(docType, tplText, renderInput.ws.pkg, genericConfig?.messages, specificConfig?.messages);

    let missing: string[] = [];
    const rendered: string = renderTemplate(tplText, values, (name: string): void => {
      missing = [...missing, name];
    });
    if (missing.length) {
      console.warn(`[warn] ${docType}: ${missing.length} placeholders had no value: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`);
    }

    const outName: string = `${docType}.md`;
    const outPath: string = path.join(renderInput.outDir, outName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, rendered, 'utf8');
    console.log(`${docType}.md written -> ${outPath}`);
  }

  async function generateAll(renderInput: TRenderInput, options: TTemplateGeneratorOptions): Promise<void> {
    await (Object.values(LegalDocumentType) as ReadonlyArray<TLegalDocumentType>).reduce<Promise<void>>(async (prev: Promise<void>, docType: TLegalDocumentType): Promise<void> => {
      await prev;
      if (renderInput.types.has(docType)) {
        await generateForType(renderInput, docType, options);
      }
    }, Promise.resolve());
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
    generateAll,
    isExist,
    loadRoot,
    loadWorkspaces,
    npmLsJson,
    readConfig,
    renderMarkdown,
    resolveWorkspaceFromArg,
    setDebugMode
  };
}
