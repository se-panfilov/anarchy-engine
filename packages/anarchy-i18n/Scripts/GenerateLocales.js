import { promises as fs } from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : def;
};

const CONFIG_PATH = getArg('--config', 'src/Config/locales.config.jsonc');
const OUT_CONST_PATH = getArg('--out-const', 'src/Constants/Locales.gen.ts');
const OUT_MODELS_PATH = getArg('--out-models', 'src/Models/TLocales.gen.ts');

const fileExists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const readText = (p) => fs.readFile(p, 'utf8');

const parseJSONC = (text) => {
  const noComments = text.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const noTrailingCommas = noComments.replace(/,\s*([\]}])/g, '$1');
  return JSON.parse(noTrailingCommas);
};

const ext = (p) => path.extname(p).toLowerCase();

async function loadConfig(configPath) {
  const abs = path.resolve(process.cwd(), configPath);
  const e = ext(abs);
  if (e === '.json' || e === '.jsonc') {
    const txt = await readText(abs);
    const data = e === '.jsonc' ? parseJSONC(txt) : JSON.parse(txt);
    return [...(data || [])];
  }

  throw new Error(`Unsupported config extension: ${e}. Use .json/.jsonc`);
}

const isScript = (sub) => /^[A-Z][a-z]{3}$/.test(sub); // Latn, Cyrl, Hans, Hant...
const isRegion = (sub) => /^([A-Z]{2}|\d{3})$/.test(sub); // US, GB, NL, 419...

const parseParts = (tagRaw) => {
  const tag = String(tagRaw || '')
    .trim()
    .replace(/_/g, '-');
  const [langRaw, ...rest] = tag.split('-');
  const language = (langRaw || '').toLowerCase();
  let script;
  let region;
  for (const subRaw of rest) {
    if (!script && isScript(subRaw)) {
      script = subRaw[0].toUpperCase() + subRaw.slice(1).toLowerCase();
      continue;
    }
    if (!region && isRegion(subRaw)) {
      region = subRaw.toUpperCase();
      continue;
    }
  }
  return { language, script, region };
};

const canonicalize = (tag) => {
  try {
    const [c] = Intl.getCanonicalLocales(tag);
    if (c) return c;
  } catch {}
  const p = parseParts(tag);
  return [p.language, p.script, p.region].filter(Boolean).join('-');
};

// A minimal set of RTL scripts (extend if needed)
const RTL_SCRIPTS = new Set([
  // Modern/Living scripts in digital use
  'Adlm', // Adlam
  'Arab', // Arabic
  'Aran', // Arabic (Nastaliq) — distinct code ISO-15924
  'Hebr', // Hebrew
  'Nkoo', // N’Ko
  'Syrc', // Syriac
  'Thaa', // Thaana
  'Rohg', // Hanifi Rohingya
  'Mand', // Mandaic
  'Samr', // Samaritan
  'Yezi', // Yezidi
  'Mend', // Mende Kikakui

  // Historical or rare scripts (for completeness and correct rendering)
  'Armi', // Imperial Aramaic
  'Avst', // Avestan
  'Chrs', // Chorasmian
  'Elym', // Elymaic
  'Hatr', // Hatran
  'Khar', // Kharoshthi
  'Lydi', // Lydian
  'Mani', // Manichaean
  'Merc', // Meroitic Cursive
  'Mero', // Meroitic Hieroglyphs
  'Narb', // Old North Arabian
  'Nbat', // Nabataean
  'Orkh', // Old Turkic (Orkhon)
  'Palm', // Palmyrene
  'Phli', // Inscriptional Pahlavi
  'Phlp', // Psalter Pahlavi
  'Phnx', // Phoenician
  'Prti', // Inscriptional Parthian
  'Sarb', // Old South Arabian
  'Sogd', // Sogdian
  'Sogo', // Old Sogdian
  'Cprt' // Cypriot syllabary
]);

// Some languages are RTL regardless of missing script in tag
const RTL_LANGS = new Set([
  'ar', // Arabic
  'he', // Hebrew
  'fa', // Persian (Farsi)
  'ur', // Urdu
  'ps', // Pashto
  'dv', // Dhivehi (Thaana)
  'ckb', // Central Kurdish (Sorani)
  'ug', // Uyghur (default Arab)
  'sd', // Sindhi
  'ks', // Kashmiri (часто Arab по умолчанию)
  'prs', // Dari (Afghan Persian)
  'yi' // Yiddish (Hebrew script)
]);

const inferDirection = (language, script) => ((script && RTL_SCRIPTS.has(script)) || RTL_LANGS.has(language) ? 'rtl' : 'ltr');

// Intl.DisplayNames helpers (with graceful fallback)
const makeDN = (locale, type) => {
  try {
    return new Intl.DisplayNames(locale, { type });
  } catch {
    // Older Node without full-ICU — we fallback to simple identity
    return { of: (x) => x };
  }
};
const dn = {
  en: {
    language: makeDN('en', 'language'),
    region: makeDN('en', 'region'),
    script: makeDN('en', 'script')
  },
  any: (loc, type) => makeDN(loc, type)
};

const buildEnglishName = (id, parts) => {
  const lang = dn.en.language.of(parts.language) || parts.language;
  const bits = [];
  if (parts.script) bits.push(dn.en.script.of(parts.script) || parts.script);
  // if (parts.region) bits.push(dn.en.region.of(parts.region) || parts.region);
  return (bits.length ? `${lang} (${bits.join(', ')})` : lang).trim();
};

const buildNativeName = (id, parts) => {
  let langName;
  try {
    langName = dn.any(id, 'language').of(parts.language);
  } catch {}
  if (!langName) {
    try {
      langName = dn.any(parts.language, 'language').of(parts.language);
    } catch {}
  }
  langName ||= parts.language;

  const bits = [];
  if (parts.script) {
    let s;
    try {
      s = dn.any(id, 'script').of(parts.script);
    } catch {}
    bits.push(s || parts.script);
  }
  // if (parts.region) {
  //   let r;
  //   try {
  //     r = dn.any(id, 'region').of(parts.region);
  //   } catch {}
  //   bits.push(r || parts.region);
  // }
  return (bits.length ? `${langName} (${bits.join(', ')})` : langName).trim();
};

async function generate(localeIds) {
  if (!Array.isArray(localeIds) || localeIds.length === 0) {
    throw new Error('Config must have non-empty "localeIds" array.');
  }

  const locales = localeIds.map((rawId) => {
    const id = canonicalize(rawId);
    const p = parseParts(id);
    if (!p.language) throw new Error(`Invalid locale id: "${rawId}"`);
    const direction = inferDirection(p.language, p.script);

    return {
      id,
      languageCode: p.language,
      regionCode: p.region,
      scriptCode: p.script,
      englishName: buildEnglishName(id, p),
      nativeName: buildNativeName(id, p),
      direction
    };
  });

  const header = ['/* AUTO-GENERATED by GenerateLocales.js script — do not edit manually. */', '/* eslint-disable spellcheck/spell-checker */'].join('\n');

  writeConstants(header, locales);
  writeModels(header, locales);

  process.stdout.write(`Generated constants at ${path.relative(process.cwd(), OUT_CONST_PATH)} with ${locales.length} locales.\n`);
  process.stdout.write(`Generated models at ${path.relative(process.cwd(), OUT_MODELS_PATH)}.\n`);
}

const cfgExists = await fileExists(CONFIG_PATH);
if (!cfgExists) {
  throw new Error(`Config file not found: ${CONFIG_PATH}`);
}
const config = await loadConfig(CONFIG_PATH);
await generate(config);

// Helpers
async function writeConstants(header, locales) {
  const body = `
import type { TLocale } from '@Anarchy/i18n/Models';

${locales.map((locale) => `export const ${kebabToCamel(locale.id)}: TLocale =  ` + toTs(locale)).join(';\n')};

`;

  await fs.mkdir(path.dirname(OUT_CONST_PATH), { recursive: true });
  await fs.writeFile(OUT_CONST_PATH, header + body, 'utf8');
}

async function writeModels(header, locales) {
  //export type TLocale = Readonly<{
  //   id: TLocaleId; // BCP47, e.g. 'en-US'
  //   languageCode: string; // 'en' (ISO 639-1)
  //   regionCode?: string; // 'US' (ISO 3166-1 alpha-2)
  //   scriptCode?: string; // 'Latn' | 'Cyrl' | 'Hans' |
  //   englishName: string;
  //   nativeName: string;
  //   direction: 'ltr' | 'rtl';
  // }>;
  const modelsStr = `

// Union type of all possible BCP47 IDs
export type TLocaleId = ${getUnion(locales, 'id')};

export type TLocaleCode = ${getUnion(locales, 'languageCode')};

export type TRegionCode = ${getUnion(
    locales.filter((locale) => locale.regionCode),
    'regionCode'
  )};

export type TScriptCode = ${getUnion(
    locales.filter((locale) => locale.scriptCode),
    'scriptCode'
  )};
`;

  await fs.mkdir(path.dirname(OUT_MODELS_PATH), { recursive: true });
  await fs.writeFile(OUT_MODELS_PATH, header + modelsStr, 'utf8');
}

function getUnion(list, key) {
  return removeDuplicates(list.map((item) => item[key]))
    .map((val) => `  | '${val}'`)
    .join('\n');
}

function toTs(locale) {
  return JSON.stringify(locale)
    .replace(/"([a-zA-Z0-9_]+)":/g, '$1:') // unquote keys (pretty)
    .replace(/"ltr"|\"rtl\"/g, (m) => m); // keep as strings
}

function kebabToCamel(input) {
  if (!input.includes('-')) return input;

  return input
    .toLowerCase()
    .split('-')
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

function removeDuplicates(array) {
  return Array.from(new Set(array));
}
