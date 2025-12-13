import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import type {
  TAnarchyLegalConfig,
  TAnarchyLegalConfigEntry,
  TLegalDocumentType,
  TLegalFilesUtilsService,
  TRenderInput,
  TRepoUtilsService,
  TTemplateGeneratorOptions,
  TTemplateMessages
} from '@Anarchy/Legal/Models';
import { UTCDate } from '@date-fns/utc';
import { isValid, parseISO } from 'date-fns';
import { format as dfFormat } from 'date-fns/format';
// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';

import { LegalDocumentType } from '../Constants/LegalDocumentType.ts';

export function LegalFilesUtilsService(repoUtilsService: TRepoUtilsService): TLegalFilesUtilsService {
  const { debugLog, isExist, isDebug } = repoUtilsService;

  async function readConfig(wsDir: string): Promise<TAnarchyLegalConfig> | never {
    const candidates: ReadonlyArray<string> = [path.join(wsDir, 'anarchy-legal.config.js'), path.join(wsDir, 'anarchy-legal.config.mjs'), path.join(wsDir, 'anarchy-legal.config.cjs')];

    const found: string | undefined = await candidates.reduce<Promise<string | undefined>>(async (prevPromise: Promise<string | undefined>, p: string): Promise<string | undefined> => {
      const prev: string | undefined = await prevPromise;
      if (prev) return prev;
      return (await isExist(p)) ? p : undefined;
    }, Promise.resolve(undefined));

    if (!found) {
      debugLog(isDebug(), 'config: <none> (no JS config found)');
      return {};
    }

    try {
      const mod = await import(pathToFileURL(found).href);
      // Support both ESM default export and CommonJS module.exports
      const exported = (mod && 'default' in mod ? (mod as any).default : mod) as unknown;

      if (!exported || typeof exported !== 'object' || Array.isArray(exported)) throw new Error('Invalid config export. Expected an object like { GENERIC: {...}, EULA: {...}, ... }.');

      // Very light validation and narrowing
      const obj = exported as Record<string, unknown>;

      const processConfigSection = (k: 'GENERIC' | string): [string, any] | undefined => {
        const v = obj[k];
        if (v === undefined) return undefined;
        if (!v || typeof v !== 'object' || Array.isArray(v)) {
          console.warn(`[warn] anarchy-legal.config: section "${k}" must be an object; got ${typeof v}. Skipped.`);
          return undefined;
        }
        const { template, messages, relativeOutput, outputName } = v as TAnarchyLegalConfigEntry;
        return [
          k,
          {
            ...(template ? { template } : {}),
            ...(messages ? { messages } : {}),
            ...(relativeOutput ? { relativeOutput } : {}),
            ...(outputName ? { outputName } : {})
          }
        ];
      };

      const processedEntries = Object.keys(obj)
        .map(processConfigSection)
        .filter((entry): entry is [string, any] => entry !== undefined);
      const config: TAnarchyLegalConfig = Object.fromEntries(processedEntries);

      debugLog(isDebug(), 'config file:', found, 'keys:', Object.keys(config));
      return config;
    } catch (e) {
      const msg: string = e instanceof Error ? e.message : String(e);
      throw new Error(`Failed to load config ${found}: ${msg}`);
    }
  }

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
    const def: string = path.join(templatesDir, `${defaultTemplateBaseName(docType)}${templateExtension}`);
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
  /** Parse/format via date-fns.
   *  Special case: when dateStr === "now", output uses UTC date/time (not local).
   */
  const formatWithDateFns = (dateStr: string, format: string): string => {
    const d: Date =
      dateStr.toLowerCase() === 'now'
        ? new UTCDate()
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

  // Convert message value → string (for variable substitution)
  function materializeMessage(v: unknown): string {
    if (v === null || v === undefined) return '';
    if (typeof v === 'string') return v;
    if (typeof v === 'number') return Number.isFinite(v) ? String(v) : '';
    if (typeof v === 'boolean') return v ? 'true' : 'false'; // only for {{VAR}} replacement
    // date-object: { date: string; format: string } -> via date-fns
    if (typeof v === 'object' && 'date' in (v as any) && 'format' in (v as any)) {
      const { date, format } = v as { date: string; format: string };
      if (typeof date === 'string' && typeof format === 'string') return formatWithDateFns(date, format);
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
        const direct: unknown = pkg[key.toLowerCase()];
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

  // Build both: materialized values for {{VAR}} and raw map for section truthiness
  function buildContext(
    docType: TLegalDocumentType,
    tplText: string,
    pkg: Readonly<Record<string, unknown>>,
    generic: Readonly<Record<string, unknown>> | undefined,
    specific: Readonly<Record<string, unknown>> | undefined
  ): Readonly<{ values: Record<string, string>; raw: Record<string, unknown> }> {
    const values: Readonly<Record<string, string>> = buildPlaceholderValues(docType, tplText, pkg, generic as any, specific as any);

    const raw: Record<string, unknown> = {
      ...Object.fromEntries(Object.entries(values)),
      ...(generic || {}),
      ...(specific || {})
    };

    return { values, raw };
  }

  // Replace variables {{VAR}} with materialized values
  function renderVariables(tpl: string, values: Readonly<Record<string, string>>, onMissing?: (name: string) => void): string {
    const VAR_RE = /{{\s*([A-Z0-9_]+)\s*}}/g;
    return tpl.replace(VAR_RE, (_m, g1: string) => {
      const v: string = values[g1];
      if (v === undefined) {
        onMissing?.(g1);
        return '';
      }
      return v;
    });
  }

  // Evaluate sections recursively until nothing left
  function renderSections(input: string, truthyMap: Readonly<Record<string, unknown>>): string {
    const SECTION_RE = /{{\s*([#^])\s*([A-Z0-9_]+)\s*}}([\s\S]*?){{\s*\/\s*\2\s*}}/g;

    const processUntilConverged = (current: string): string => {
      const next = current.replace(SECTION_RE, (_m, sigil: '#' | '^', name: string, body: string) => {
        const condition: boolean = Boolean(truthyMap[name]);
        const pass: boolean = sigil === '#' ? condition : !condition;
        return pass ? renderSections(body, truthyMap) : '';
      });
      return next === current ? current : processUntilConverged(next);
    };

    return processUntilConverged(input);
  }

  async function generateForType(input: TRenderInput, key: string, options: TTemplateGeneratorOptions): Promise<void> {
    const genericConfig = input.config['GENERIC'];
    const specificConfig = input.config[key];

    if (!specificConfig?.template || specificConfig.template.trim() === '') throw new Error(`[${key}] missing "template" in anarchy-legal.config.js`);

    const desiredBase: string = specificConfig.template;

    const tplPath: string | undefined = await findTemplateFile(input.templatesDir, key, options, desiredBase);
    if (!tplPath) throw new Error(`[${key}] template "${desiredBase}" not found under templates dir: ${input.templatesDir}`);

    const tplText: string = await fs.readFile(tplPath, 'utf8');

    const { values, raw } = buildContext(key, tplText, input.ws.pkg, genericConfig?.messages, specificConfig?.messages);

    const afterSections: string = renderSections(tplText, raw);

    const namesAfter: ReadonlySet<string> = collectPlaceholders(afterSections);
    const missing: ReadonlyArray<string> = Array.from(namesAfter).filter((name: string): boolean => values[name] === undefined);
    if (missing.length) console.warn(`[warn] ${key}: ${missing.length} placeholders had no value: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}`);

    const rendered: string = renderVariables(afterSections, values);

    const relOut: string | undefined = specificConfig.relativeOutput?.trim();
    if (relOut && path.isAbsolute(relOut)) console.warn(`[warn] ${key}: relativeOutput is absolute ("${relOut}"); it will be used as-is.`);
    const targetDir: string = relOut ? path.resolve(input.outDir, relOut) : input.outDir;

    const baseName: string = (specificConfig.outputName?.trim() || key).replace(/\s+$/, '');

    const outName: string = `${baseName}.md`;
    const outPath: string = path.join(targetDir, outName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, rendered, 'utf8');
    console.log(`${baseName}.md written -> ${outPath}`);
  }

  async function generateAll(renderInput: TRenderInput & { keys: ReadonlySet<string> }, options: TTemplateGeneratorOptions): Promise<void> {
    for (const k of renderInput.keys) {
      await generateForType(renderInput, k, options);
    }
  }

  // Return only those doc types that are explicitly present in the config object
  function getConfiguredDocTypes(config: TAnarchyLegalConfig): ReadonlySet<TLegalDocumentType> {
    const set = new Set<TLegalDocumentType>();
    Object.values(LegalDocumentType).forEach((docType: TLegalDocumentType) => {
      if (config[docType]) set.add(docType);
    });
    return set;
  }

  // Ensure every configured doc type has a non-empty "template" field
  function assertTemplatesPresent(config: TAnarchyLegalConfig, keys: ReadonlySet<string>): void | never {
    const missing: string[] = [];
    for (const k of keys) {
      const tpl = config[k]?.template;
      if (typeof tpl !== 'string' || tpl.trim() === '') missing.push(k);
    }

    if (missing.length) {
      throw new Error(`anarchy-legal.config.js: "template" is required for sections: ${missing.join(', ')}`);
    }
  }

  function getConfiguredDocKeys(config: TAnarchyLegalConfig): ReadonlySet<string> {
    const set = new Set<string>();
    for (const k of Object.keys(config || {})) {
      if (k === 'GENERIC') continue;
      set.add(k);
    }
    return set;
  }

  return {
    assertTemplatesPresent,
    generateAll,
    getConfiguredDocKeys,
    getConfiguredDocTypes,
    readConfig
  };
}
