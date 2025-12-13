#!/usr/bin/env node
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import standaloneCode from 'ajv/dist/standalone/index.js';

// Simple AJV Standalone generator (ESM)
// Usage: node build-validators.mjs --schemas ./schemas --out ./src/Generated/validators --files settings.schema.json savegame.schema.json

const HELP = `
Generate ESM validators from JSON Schemas using AJV Standalone.

Usage:
  node build-validators.mjs --schemas <dir> --out <dir> [--files <f1> <f2> ...]
  node build-validators.mjs --schemas <dir> --out <dir> --glob "*.schema.json"
  node build-validators.mjs --help

Options:
  --schemas <dir>      Directory with schema files (.json).
  --out <dir>          Output directory for generated module.
  --files <list...>    Explicit list of schema file names (space-separated).
  --glob <pattern>     Simple suffix filter, e.g. "*.schema.json" (default).
  --module <name>      Output module file name (default: validators.mjs).
  --dts                Also emit a minimal validators.d.ts (named exports).
  --no-formats         Do not add ajv-formats (default: formats enabled).
  --strict             Enable AJV strict mode (default).
  --loose              Disable AJV strict mode.
  --help               Show this help.

Notes:
  - ESM multi-export: we must pass a mapping { ExportName: "$id" } to standaloneCode (see docs).
  - ExportName is derived from file name: "settings.schema.json" -> "validateSettings".
`;

function parseArgs(argv) {
  const args = {
    schemas: null,
    out: null,
    files: [],
    glob: '*.schema.json',
    module: 'Validators.gen.ts',
    dts: false,
    formats: true,
    strict: true,
    help: false
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      args.help = true;
      break;
    }
    if (a === '--schemas') {
      args.schemas = argv[++i];
      continue;
    }
    if (a === '--out') {
      args.out = argv[++i];
      continue;
    }
    if (a === '--files') {
      while (argv[i + 1] && !argv[i + 1].startsWith('--')) args.files.push(argv[++i]);
      continue;
    }
    if (a === '--glob') {
      args.glob = argv[++i];
      continue;
    }
    if (a === '--module') {
      args.module = argv[++i];
      continue;
    }
    if (a === '--dts') {
      args.dts = true;
      continue;
    }
    if (a === '--no-formats') {
      args.formats = false;
      continue;
    }
    if (a === '--strict') {
      args.strict = true;
      continue;
    }
    if (a === '--loose') {
      args.strict = false;
      continue;
    }
    console.warn(`[warn] Unknown arg: ${a}`);
  }

  return args;
}

function die(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

function listSchemas(dir, files, globPat) {
  if (files && files.length) return files;
  const all = readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((n) => extname(n).toLowerCase() === '.json');
  if (globPat && globPat.startsWith('*.')) {
    const suf = globPat.slice(1); // ".schema.json"
    return all.filter((n) => n.endsWith(suf));
  }
  return all;
}

function exportNameFromFile(file) {
  const base = basename(file)
    .replace(/\.json$/i, '')
    .replace(/\.schema$/i, '');
  const cap = base.replace(/[-_ ]+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase()).replace(/^([a-z])/, (_, c) => c.toUpperCase());
  return 'validate' + cap;
}

function loadJson(path) {
  const txt = readFileSync(path, 'utf8');
  try {
    return JSON.parse(txt);
  } catch (e) {
    die(`[error] Invalid JSON in schema: ${path}\n${e.message}`);
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(HELP);
    return;
  }

  if (!args.schemas || !args.out) {
    console.log(HELP);
    die('[error] --schemas and --out are required.');
  }

  const schemaFiles = listSchemas(args.schemas, args.files, args.glob);
  if (schemaFiles.length === 0) die('[error] No schema files found.');

  // AJV setup
  const ajv = new Ajv({
    strict: args.strict,
    allErrors: true,
    code: { source: true, esm: true }
  });
  if (args.formats) addFormats(ajv);

  const esmExports = {}; // { ExportName: "$id" }

  for (const f of schemaFiles) {
    const abs = join(args.schemas, f);
    const schema = loadJson(abs);

    if (typeof schema.$id !== 'string' || !schema.$id) {
      const base = f.replace(/\.json$/i, '');
      schema.$id = `urn:schema:${base}`;
    }

    try {
      ajv.addSchema(schema);
      const exportName = exportNameFromFile(f);
      esmExports[exportName] = schema.$id;
      console.log(`[ok] added ${f} as $id=${schema.$id} -> export ${exportName}`);
    } catch (e) {
      die(`[error] failed to add/compile schema: ${f}\n${e.message}`);
    }
  }

  const code = standaloneCode(ajv, esmExports);
  mkdirSync(args.out, { recursive: true });
  const outFile = join(args.out, args.module);
  writeFileSync(outFile, code, 'utf8');
  console.log(`[write] ${outFile}`);

  if (args.dts) {
    const lines = Object.keys(esmExports)
      .map((name) => `export function ${name}(data: unknown): boolean;`)
      .join('\n');
    const dtsPath = join(args.out, args.module.replace(/\.m?js$/i, '.d.ts'));
    writeFileSync(dtsPath, `// AUTO-GENERATED\n${lines}\n`, 'utf8');
    console.log(`[write] ${dtsPath}`);
  }

  console.log('[done] validators generated ✔');
}

main().catch((e) => die(`[fatal] ${e?.stack || e?.message || e}`));
