import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TAnarchyLegalConfigEntry, TDateMessage, TLegalDocumentType, TLegalFilesService, TRepoUtilsService, TTemplateMessages, TWorkspaceInfo } from '@Anarchy/Legal';
import type { TAnarchyLegalConfig } from '@Anarchy/Legal/Models';
import { format as dfFormat, isValid, parseISO } from 'date-fns';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { LegalDocumentType } from '../Constants/LegalDocumentType.ts';
import { RepoUtilsService } from './RepoUtilsService.ts';

export function LegalFilesService(): TLegalFilesService {
  let isDebug: boolean = false;
  const repoUtilsService: TRepoUtilsService = RepoUtilsService();
  const { debugLog, findMonorepoRoot, resolveWorkspaceFromArg } = repoUtilsService;

  type TRenderInput = Readonly<{
    ws: TWorkspaceInfo;
    outDir: string;
    templatesDir: string;
    types: ReadonlySet<TLegalDocumentType>;
    config: TAnarchyLegalConfig;
  }>;

  const readJson = async <T = any>(p: string): Promise<T> => JSON.parse(await fs.readFile(p, 'utf8')) as T;

  const exists = async (p: string): Promise<boolean> => {
    try {
      await fs.access(p);
      return true;
    } catch {
      return false;
    }
  };

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
          if (!(await exists(pkgPath))) return undefined;
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

  async function readConfig(wsDir: string): Promise<TAnarchyLegalConfig> {
    const p = path.join(wsDir, '.anarchy-legal.config.json');
    if (!(await exists(p))) return [];
    try {
      const json: TAnarchyLegalConfig | unknown = await readJson<unknown>(p);
      if (!Array.isArray(json)) throw new Error('config root must be an array');
      // very light validation
      return json.filter(Boolean) as TAnarchyLegalConfig;
    } catch (e) {
      throw new Error(`Failed to read ${p}: ${(e as Error).message}`);
    }
  }

  const pickEntry = (config: TAnarchyLegalConfig, type: 'GENERIC' | TLegalDocumentType): TAnarchyLegalConfigEntry | undefined =>
    config.find((e: TAnarchyLegalConfigEntry): boolean => e?.type === type);

  const TEMPLATE_EXT: string = '.md';
  const DEFAULT_TEMPLATE_BASENAME = (t: TLegalDocumentType): string => `${t}_TEMPLATE`;

  async function findTemplateFile(templatesDir: string, docType: TLegalDocumentType, desiredBase?: string): Promise<string | undefined> {
    // 1) exact by desiredBase
    if (desiredBase) {
      const exact: string = path.join(templatesDir, `${desiredBase}${TEMPLATE_EXT}`);
      if (await exists(exact)) return exact;
    }
    // 2) default <TYPE>_TEMPLATE.md
    const def = path.join(templatesDir, `${DEFAULT_TEMPLATE_BASENAME(docType)}${TEMPLATE_EXT}`);
    if (await exists(def)) return def;
    // 3) first match <TYPE>_*_TEMPLATE.md (alphabetically)
    const pattern: string = path.join(templatesDir, `${docType}_*${TEMPLATE_EXT}`);
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

  async function generateForType(i: TRenderInput, docType: TLegalDocumentType): Promise<void> {
    const genericConfig: TAnarchyLegalConfigEntry | undefined = pickEntry(i.config, 'GENERIC');
    const specificConfig: TAnarchyLegalConfigEntry | undefined = pickEntry(i.config, docType);
    const desiredBase: string | undefined = specificConfig?.template;

    const tplPath: string | undefined = await findTemplateFile(i.templatesDir, docType, desiredBase);
    if (!tplPath) {
      console.warn(`[warn] No template found for ${docType}. Skipping.`);
      return;
    }

    const tplText: string = await fs.readFile(tplPath, 'utf8');
    const values = buildPlaceholderValues(docType, tplText, i.ws.pkg, genericConfig?.messages, specificConfig?.messages);

    let missing: string[] = [];
    const rendered: string = renderTemplate(tplText, values, (name: string): void => {
      missing = [...missing, name];
    });
    if (missing.length) {
      console.warn(`[warn] ${docType}: ${missing.length} placeholders had no value: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`);
    }

    const outName: string = `${docType}.md`;
    const outPath: string = path.join(i.outDir, outName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, rendered, 'utf8');
    console.log(`${docType}.md written -> ${outPath}`);
  }

  async function generateAll(i: TRenderInput): Promise<void> {
    await (Object.values(LegalDocumentType) as ReadonlyArray<TLegalDocumentType>).reduce<Promise<void>>(async (prev, t) => {
      await prev;
      if (i.types.has(t)) {
        await generateForType(i, t);
      }
    }, Promise.resolve());
  }

  async function generate(): Promise<void> {
    // eslint-disable-next-line spellcheck/spell-checker
    const argv = await yargs(hideBin(process.argv))
      .scriptName('anarchy-legal:files')
      .usage('$0 --workspace <name|path> --out <dir> [--templates <dir>] [--types DISCLAIMER,EULA,...] [--debug]')
      .option('workspace', { type: 'string', demandOption: true, describe: 'Target workspace (name or path relative to monorepo root)' })
      .option('out', { type: 'string', demandOption: true, describe: 'Output directory for generated files (relative to current working dir allowed)' })
      .option('templates', { type: 'string', describe: 'Templates directory. Default: packages/anarchy-legal/templates' })
      .option('types', { type: 'string', describe: `Comma-separated list of doc types. Default: ${Object.values(LegalDocumentType).join(',')}` })
      .option('debug', { type: 'boolean', default: false })
      .help()
      .parseAsync();

    isDebug = Boolean(argv.debug);
    repoUtilsService.setDebugMode(isDebug);

    const scriptDir: string = path.dirname(fileURLToPath(import.meta.url));
    const startCandidates: string[] = [process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];

    // Find monorepo root
    const rootDir: string | undefined = await startCandidates.reduce<Promise<string | undefined>>(async (accP, c) => {
      const acc: string | undefined = await accP;
      if (acc) return acc;
      try {
        return await findMonorepoRoot(c);
      } catch (e) {
        debugLog(isDebug, 'no root from', c, ':', (e as Error).message);
        return undefined;
      }
    }, Promise.resolve(undefined));
    if (!rootDir) throw new Error(`Failed to find monorepo root from: ${startCandidates.join(', ')}`);

    // Load workspaces and resolve target
    const workspaces: ReadonlyMap<string, TWorkspaceInfo> = await loadWorkspaces(rootDir);
    const ws = resolveWorkspaceFromArg(String(argv.workspace), workspaces, rootDir);
    debugLog(isDebug, 'target workspace:', ws.name, ws.dir);

    // Resolve templates dir
    const templatesDir: string = argv.templates ? (path.isAbsolute(argv.templates) ? argv.templates : path.resolve(process.cwd(), argv.templates)) : path.resolve(scriptDir, '../../src/Templates');
    debugLog(isDebug, 'templates dir:', templatesDir);

    // Resolve out dir
    const outDir: string = path.isAbsolute(argv.out as string) ? (argv.out as string) : path.resolve(process.cwd(), String(argv.out));
    debugLog(isDebug, 'out dir:', outDir);

    // Types
    const typesSet: ReadonlySet<TLegalDocumentType> = ((): ReadonlySet<TLegalDocumentType> => {
      const allTypes = Object.values(LegalDocumentType) as ReadonlyArray<TLegalDocumentType>;
      if (!argv.types) return new Set(allTypes);
      const parts: ReadonlyArray<string> = String(argv.types)
        .split(',')
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);
      const isKnown = (p: string): p is TLegalDocumentType => (allTypes as ReadonlyArray<string>).includes(p);
      const known = parts.filter(isKnown);
      const unknown = parts.filter((p) => !isKnown(p));
      unknown.forEach((p) => console.warn(`[warn] Unknown doc type "${p}" ignored. Known: ${allTypes.join(', ')}`));
      const set = new Set<TLegalDocumentType>(known);
      return set.size ? set : new Set(allTypes);
    })();

    // Read config (optional)
    const config: ReadonlyArray<TAnarchyLegalConfigEntry> = await readConfig(ws.dir);
    if (config.length)
      debugLog(
        isDebug,
        'config entries:',
        config.map((c: TAnarchyLegalConfigEntry): TLegalDocumentType | 'GENERIC' => c.type)
      );
    else debugLog(isDebug, 'config: <none>');

    // Go
    await generateAll({ ws, outDir, templatesDir, types: typesSet, config });
  }

  return { generate };
}
