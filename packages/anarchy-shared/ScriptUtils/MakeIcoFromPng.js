// Creates .ico file from one or more PNGs, with optional resizing.
// Usage:
//   node scripts/MakeIcoFromPng.js --in assets/icon-1024.png --out assets/icon.ico
//   node scripts/MakeIcoFromPng.js --in assets/256.png,assets/128.png --out assets/app.ico
//   node scripts/MakeIcoFromPng.js --in assets/pngs --out assets/icon.ico
//   node scripts/MakeIcoFromPng.js --in assets/icon-1024.png --out assets/icon.ico --size 256
//
// Notes:
// - If --size is provided, all inputs are resized to NxN (requires dev-dep 'sharp').
// - If --size is omitted, inputs are used as-is (no resizing).
// - png-to-ico builds a valid ICO from given PNG buffers.

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import process from 'node:process';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

function printHelp() {
  console.log(
    `mk-ico — build a .ico from PNG(s)

Options:
  --in,  -i   Path to a PNG file. Can be repeated or comma-separated.
              If a directory is passed, all *.png files in it are used (non-recursive).
  --out, -o   Output .ico path (required).
  --size, -s  Optional square size in px (e.g. 256). If omitted, images are not resized.
  --help, -h  Show this help.

Examples:
  node scripts/MakeIcoFromPng.js --in assets/icon-1024.png --out assets/icon.ico
  node scripts/MakeIcoFromPng.js -i assets/256.png,assets/128.png -o assets/icon.ico
  node scripts/MakeIcoFromPng.js -i assets/pngs -o assets/icon.ico
  node scripts/MakeIcoFromPng.js -i assets/icon-1024.png -o assets/icon.ico -s 256
`
  );
}

function parseArgs(argv) {
  const args = { inputs: [], out: null, help: false, size: null };
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
    if (a === '--size' || a === '-s') {
      const val = argv[++i];
      if (val && /^\d+$/.test(val)) args.size = Number(val);
      else throw new Error(`--size expects a positive integer, got: ${val ?? '(missing)'}`);
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
      if (pngs.length === 0) throw new Error(`Directory has no PNGs: ${abs}`);
      result.push(...pngs);
    } else if (st.isFile()) {
      if (extname(abs).toLowerCase() !== '.png') throw new Error(`Input is not a .png file: ${abs}`);
      result.push(abs);
    } else {
      throw new Error(`Unsupported input type (not file/dir): ${abs}`);
    }
  }
  // de-dup, keep order
  return [...new Set(result)];
}

async function maybeResize(buf, size) {
  if (!size) return buf;
  if (!(Number.isInteger(size) && size > 0 && size <= 4096)) {
    throw new Error(`--size must be an integer in range 1..4096, got ${size}`);
  }
  return sharp(buf).resize(size, size, { fit: 'contain', withoutEnlargement: false }).png().toBuffer();
}

async function main() {
  const { inputs, out, help, size } = parseArgs(process.argv.slice(2));
  if (help || inputs.length === 0 || !out) {
    printHelp();
    if (help) return;
    process.exit(1);
  }

  const inFiles = await resolveInputs(inputs);
  if (inFiles.length === 0) throw new Error('No PNG inputs resolved.');

  // Read PNGs, optional resize
  const bufs = await Promise.all(
    inFiles.map(async (p) => {
      const b = await readFile(p);
      return maybeResize(b, size);
    })
  );

  try {
    const icoBuf = await pngToIco(bufs);
    const outPath = resolve(out);
    await writeFile(outPath, icoBuf);
    const sizeMsg = size ? ` (resized to ${size}x${size})` : '';
    console.log(`✔ Wrote ICO: ${outPath} from ${inFiles.length} PNG file(s)${sizeMsg}.`);
  } catch (e) {
    console.error('✖ Failed to build ICO:', e?.message || e);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('✖ Error:', err?.message || err);
  process.exit(1);
});
