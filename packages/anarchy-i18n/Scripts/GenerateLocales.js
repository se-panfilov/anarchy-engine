import { promises as fs } from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : def;
};

const CONFIG_PATH = getArg('--config', 'src/Config/locales.config.jsonc');
const OUT_PATH = getArg('--out', 'src/Constants/Locales.gen.ts');

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
    const dir = inferDirection(p.language, p.script);

    return {
      id,
      languageCode: p.language,
      regionCode: p.region,
      scriptCode: p.script,
      englishName: buildEnglishName(id, p),
      nativeName: buildNativeName(id, p),
      dir
    };
  });

  const header = ['/* AUTO-GENERATED by GenerateLocales.js script — do not edit manually. */', '/* eslint-disable spellcheck/spell-checker */'].join('\n');

  const toTs = (l) => {
    const json = JSON.stringify(l, null, 2)
      .replace(/"([a-zA-Z0-9_]+)":/g, '$1:') // unquote keys (pretty)
      .replace(/"ltr"|\"rtl\"/g, (m) => m); // keep as strings
    return json;
  };

  function kebabToCamel(input) {
    if (!input.includes('-')) return input;

    return input
      .toLowerCase()
      .split('-')
      .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
      .join('');
  }

  const body = `
import type { TLocale } from '@Anarchy/i18n/Models';

${locales.map((l) => `export const ${kebabToCamel(l.id)}: TLocale =  ` + toTs(l)).join(';\n\n')};

`;

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, header + body, 'utf8');

  process.stdout.write(`Generated ${path.relative(process.cwd(), OUT_PATH)} with ${locales.length} locales.\n`);
}

const cfgExists = await fileExists(CONFIG_PATH);
if (!cfgExists) {
  throw new Error(`Config file not found: ${CONFIG_PATH}`);
}
const config = await loadConfig(CONFIG_PATH);
await generate(config);
