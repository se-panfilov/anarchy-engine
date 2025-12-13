// Minimal CLI to create Windows .ico from one or more PNGs.
// Usage:
//   node scripts/mk-ico.mjs --in assets/icon-1024.png --out assets/icon.ico
//   node scripts/mk-ico.mjs --in assets/256.png,assets/128.png --out assets/app.ico
//   node scripts/mk-ico.mjs --in assets/256.png --in assets/128.png --out assets/app.ico
//
// Notes:
// - png-to-ico will generate a proper ICO and handle resizing internally.
// - Provide the largest PNG you have (e.g. 512/1024 px) for best quality.
// - This script intentionally avoids extra deps (no glob/yargs).

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import process from 'node:process';
import pngToIco from 'png-to-ico';

function printHelp() {
  console.log(
    `mk-ico — build a .ico from PNG(s)

Options:
  --in,  -i   Path to a PNG file. Can be repeated or comma-separated.
              If a directory is passed, all *.png files in it are used (non-recursive).
  --out, -o   Output .ico path (required).
  --help, -h  Show this help.

Examples:
  node scripts/mk-ico.mjs --in assets/icon-1024.png --out assets/icon.ico
  node scripts/mk-ico.mjs -i assets/256.png,assets/128.png -o assets/icon.ico
  node scripts/mk-ico.mjs -i assets/pngs -o assets/icon.ico
`
  );
}

function parseArgs(argv) {
  const args = { inputs: [], out: null, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') {
      args.help = true;
      continue;
    }
    if (a === '--out' || a === '-o') {
      args.out = argv[++i];
      continue;
    }
    if (a === '--in' || a === '-i') {
      const val = argv[++i];
      if (val) args.inputs.push(...val.split(','));
      continue;
    }
  }
  return args;
}

async function listPngsFromDir(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  return entries.filter((e) => e.isFile() && extname(e.name).toLowerCase() === '.png').map((e) => resolve(dirPath, e.name));
}

async function resolveInputs(maybePaths) {
  const result = [];
  for (const p of maybePaths) {
    const abs = resolve(p);
    let st;
    try {
      st = await stat(abs);
    } catch {
      throw new Error(`Input path does not exist: ${abs}`);
    }
    if (st.isDirectory()) {
      const pngs = await listPngsFromDir(abs);
      if (pngs.length === 0) {
        throw new Error(`Directory has no PNGs: ${abs}`);
      }
      result.push(...pngs);
    } else if (st.isFile()) {
      if (extname(abs).toLowerCase() !== '.png') {
        throw new Error(`Input is not a .png file: ${abs}`);
      }
      result.push(abs);
    } else {
      throw new Error(`Unsupported input type (not file/dir): ${abs}`);
    }
  }
  // de-dup, keep order
  return [...new Set(result)];
}

async function main() {
  const { inputs, out, help } = parseArgs(process.argv.slice(2));
  if (help || inputs.length === 0 || !out) {
    printHelp();
    if (help) return;
    process.exit(1);
  }

  const inFiles = await resolveInputs(inputs);
  if (inFiles.length === 0) {
    throw new Error('No PNG inputs resolved.');
  }

  // Read all PNGs as buffers (png-to-ico accepts paths or buffers; buffers are explicit)
  const bufs = await Promise.all(inFiles.map((p) => readFile(p)));

  try {
    const icoBuf = await pngToIco(bufs);
    const outPath = resolve(out);
    await writeFile(outPath, icoBuf);
    console.log(`✔ Wrote ICO: ${outPath} from ${inFiles.length} PNG file(s).`);
  } catch (e) {
    console.error('✖ Failed to build ICO:', e.message || e);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('✖ Error:', err.message || err);
  process.exit(1);
});
