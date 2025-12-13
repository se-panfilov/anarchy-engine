import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TLegalFilesService, TRepoUtilsService, TWorkspaceInfo } from '@Anarchy/Legal';
import { format as dfFormat, isValid, parseISO } from 'date-fns';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RepoUtilsService } from './RepoUtilsService.ts';

export function LegalFilesService(): TLegalFilesService {
  let isDebug: boolean = false;
  const repoUtilsService: TRepoUtilsService = RepoUtilsService();
  const { debugLog, findMonorepoRoot, resolveWorkspaceFromArg } = repoUtilsService;

  const DOC_TYPES = ['DISCLAIMER', 'EULA', 'PRIVACY', 'SECURITY'] as const;
  type TDocType = (typeof DOC_TYPES)[number];

  type TDateMessage = Readonly<{
    date: string; // "now" or ISO-like "yyyy-MMMM-dd" or full ISO
    format: string; // date-fns tokens (yyyy, MM, dd, ...)
  }>;

  type TMessages = Readonly<Record<string, string | TDateMessage>>;

  type TConfigEntry = Readonly<{
    type: 'GENERIC' | TDocType;
    template?: string; // base name without extension, e.g. "DISCLAIMER_COMMERCIAL_TEMPLATE"
    messages?: TMessages;
  }>;

  type TConfig = ReadonlyArray<TConfigEntry>;

  type TRenderInput = Readonly<{
    ws: TWorkspaceInfo;
    outDir: string;
    templatesDir: string;
    types: ReadonlySet<TDocType>;
    config: TConfig;
  }>;

  // ---------------------- Utils ----------------------

  const readJson = async <T extends Record<string, unknown>>(p: string): Promise<T> => JSON.parse(await fs.readFile(p, 'utf8')) as T;

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
    const dirs = await globby(patterns, { cwd: rootDir, absolute: true, onlyDirectories: true, gitignore: true, ignore: ['**/node_modules/**', '**/dist/**', '**/.*/**'] });
    const entries: Array<[string, TWorkspaceInfo]> = [];
    for (const dir of dirs) {
      const pkgPath = path.join(dir, 'package.json');
      if (!(await exists(pkgPath))) continue;
      const pkg = await readJson<Record<string, unknown>>(pkgPath);
      const name = typeof pkg.name === 'string' ? pkg.name : undefined;
      if (!name) continue;
      entries.push([name, { name, dir, pkgPath, pkg }]);
    }
    return new Map(entries);
  }

  // ---------------------- Config ----------------------

  async function readConfig(wsDir: string): Promise<TConfig> {
    const p = path.join(wsDir, '.anarchy-legal.config.json');
    if (!(await exists(p))) return [];
    try {
      const json = await readJson<unknown>(p);
      if (!Array.isArray(json)) throw new Error('config root must be an array');
      // very light validation
      return json.filter(Boolean) as TConfig;
    } catch (e) {
      throw new Error(`Failed to read ${p}: ${(e as Error).message}`);
    }
  }

  const pickEntry = (cfg: TConfig, type: 'GENERIC' | TDocType): TConfigEntry | undefined => cfg.find((e) => e?.type === type);

  // ---------------------- Templates ----------------------

  const TEMPLATE_EXT: string = '.md';
  const DEFAULT_TEMPLATE_BASENAME = (t: TDocType): string => `${t}_TEMPLATE`;

  async function findTemplateFile(templatesDir: string, docType: TDocType, desiredBase?: string): Promise<string | undefined> {
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
    const found: string[] = await globby([pattern], { absolute: true });
    found.sort();
    return found[0];
  }

  // ---------------------- Placeholder rendering ----------------------

  const PLACEHOLDER_RE = /{{\s*([A-Z0-9_]+)\s*}}/g;

  /** Parse date string with date-fns (supports "now", ISO, and Date constructor fallback) */
  const formatWithDateFns = (dateStr: string, fmt: string): string => {
    const d =
      dateStr.toLowerCase() === 'now'
        ? new Date()
        : ((): Date => {
            // try parseISO first; fallback to Date ctor
            const iso = parseISO(dateStr);
            return isValid(iso) ? iso : new Date(dateStr);
          })();
    if (!isValid(d)) return ''; // invalid date → empty
    try {
      return dfFormat(d, fmt);
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
    const names: Set<string> = new Set<string>();
    let m: RegExpExecArray | null;
    while ((m = PLACEHOLDER_RE.exec(tpl))) names.add(m[1]);
    return names;
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
      default:
        // if someone uses {{PACKAGE_FOO_BAR}}, try naive lowercased lookup "foo_bar" then "fooBar"
        const lowered: string = key.toLowerCase();
        const direct = (pkg as any)[lowered];
        if (typeof direct === 'string') return direct;
        return undefined;
    }
  }

  // Build final map for a given doc type
  function buildPlaceholderValues(
    docType: TDocType,
    tplText: string,
    pkg: Readonly<Record<string, unknown>>,
    generic: TMessages | undefined,
    specific: TMessages | undefined
  ): Readonly<Record<string, string>> {
    const names: ReadonlySet<string> = collectPlaceholders(tplText);
    const out: Record<string, string> = {};

    // 1) Package-derived for PACKAGE_*
    for (const name of names) {
      if (name.startsWith('PACKAGE_')) {
        const suffix: string = name.slice('PACKAGE_'.length);
        const v: string | undefined = packagePlaceholder(suffix, pkg);
        if (v !== undefined) out[name] = v;
      }
    }

    // 2) Generic overrides
    if (generic) {
      for (const [k, v] of Object.entries(generic)) out[k] = materializeMessage(v);
    }
    // 3) Type-specific overrides
    if (specific) {
      for (const [k, v] of Object.entries(specific)) out[k] = materializeMessage(v);
    }

    return out;
  }

  // Render
  function renderTemplate(tpl: string, values: Readonly<Record<string, string>>, onMissing: (name: string) => void): string {
    return tpl.replace(PLACEHOLDER_RE, (_m, g1: string) => {
      const v = values[g1];
      if (v === undefined) {
        onMissing(g1);
        return '';
      }
      return v;
    });
  }

  // ---------------------- Main rendering pipeline ----------------------

  async function generateForType(i: TRenderInput, docType: TDocType): Promise<void> {
    const cfgGeneric: TConfigEntry | undefined = pickEntry(i.config, 'GENERIC');
    const cfgSpecific: TConfigEntry | undefined = pickEntry(i.config, docType);
    const desiredBase: string | undefined = cfgSpecific?.template;

    const tplPath: string | undefined = await findTemplateFile(i.templatesDir, docType, desiredBase);
    if (!tplPath) {
      console.warn(`[warn] No template found for ${docType}. Skipping.`);
      return;
    }

    const tplText: string = await fs.readFile(tplPath, 'utf8');
    const values = buildPlaceholderValues(docType, tplText, i.ws.pkg, cfgGeneric?.messages, cfgSpecific?.messages);

    const missing: string[] = [];
    const rendered: string = renderTemplate(tplText, values, (name) => missing.push(name));
    if (missing.length) {
      console.warn(`[warn] ${docType}: ${missing.length} placeholders had no value: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`);
    }

    const outName: string = `${docType}.md`;
    const outPath: string = path.join(i.outDir, outName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, rendered, 'utf8');
    console.log(`✔ ${docType}.md written -> ${outPath}`);
  }

  async function generateAll(i: TRenderInput): Promise<void> {
    for (const t of DOC_TYPES) {
      if (!i.types.has(t)) continue;
      await generateForType(i, t);
    }
  }

  // ---------------------- CLI ----------------------

  async function generate(): Promise<void> {
    const argv = await yargs(hideBin(process.argv))
      .scriptName('anarchy-legal:files')
      .usage('$0 --workspace <name|path> --out <dir> [--templates <dir>] [--types DISCLAIMER,EULA,...] [--debug]')
      .option('workspace', { type: 'string', demandOption: true, describe: 'Target workspace (name or path relative to monorepo root)' })
      .option('out', { type: 'string', demandOption: true, describe: 'Output directory for generated files (relative to current working dir allowed)' })
      .option('templates', { type: 'string', describe: 'Templates directory. Default: packages/anarchy-legal/templates' })
      .option('types', { type: 'string', describe: `Comma-separated list of doc types. Default: ${DOC_TYPES.join(',')}` })
      .option('debug', { type: 'boolean', default: false })
      .help()
      .parseAsync();

    isDebug = Boolean(argv.debug);
    repoUtilsService.setDebugMode(isDebug);

    const scriptDir: string = path.dirname(fileURLToPath(import.meta.url));
    const startCandidates: string[] = [process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];

    // Find monorepo root
    let rootDir: string | undefined;
    for (const c of startCandidates) {
      try {
        rootDir = await findMonorepoRoot(c);
        break;
      } catch (e) {
        debugLog(isDebug, 'no root from', c, ':', (e as Error).message);
      }
    }
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
    const typesSet: ReadonlySet<TDocType> = (() => {
      if (!argv.types) return new Set(DOC_TYPES);
      const parts: string[] = String(argv.types)
        .split(',')
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean);
      const set = new Set<TDocType>();
      for (const p of parts) {
        if ((DOC_TYPES as ReadonlyArray<string>).includes(p)) set.add(p as TDocType);
        else console.warn(`[warn] Unknown doc type "${p}" ignored. Known: ${DOC_TYPES.join(', ')}`);
      }
      return set.size ? set : new Set(DOC_TYPES);
    })();

    // Read config (optional)
    const config: ReadonlyArray<TConfigEntry> = await readConfig(ws.dir);
    if (config.length)
      debugLog(
        isDebug,
        'config entries:',
        config.map((c) => c.type)
      );
    else debugLog(isDebug, 'config: <none>');

    // Go
    await generateAll({ ws, outDir, templatesDir, types: typesSet, config });
  }

  return { generate };
}
