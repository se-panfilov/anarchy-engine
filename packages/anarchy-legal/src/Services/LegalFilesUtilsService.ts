import fs from 'node:fs/promises';
import path from 'node:path';

import type {
  TAnarchyLegalConfig,
  TAnarchyLegalConfigEntry,
  TDateMessage,
  TLegalDocumentType,
  TLegalFilesUtilsService,
  TRenderInput,
  TRepoUtilsService,
  TTemplateGeneratorOptions,
  TTemplateMessages
} from '@Anarchy/Legal/Models';
import { isValid, parseISO } from 'date-fns';
import { format as dfFormat } from 'date-fns/format';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';

import { LegalDocumentType } from '../Constants/LegalDocumentType.ts';

export function LegalFilesUtilsService(repoUtilsService: TRepoUtilsService): TLegalFilesUtilsService {
  const { readJson, isExist } = repoUtilsService;

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
    generateAll,
    readConfig
  };
}
