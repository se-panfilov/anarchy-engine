import { NodeIO } from '@gltf-transform/core';
import { exec } from 'child_process';
import fg from 'fast-glob';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { optimize as optimizeSvg } from 'svgo';
// eslint-disable-next-line spellcheck/spell-checker
import { promisify } from 'util';

// eslint-disable-next-line spellcheck/spell-checker
const execAsync = promisify(exec);

// Allow passing target directory as CLI arg; default to ./public
const cliArg = process.argv[2];
if (cliArg === '--help' || cliArg === '-h') {
  console.log('Usage: node SanitizeAssets.js [targetDir]\nDefault targetDir is ./public');
  process.exit(0);
}
const TARGET_DIR = path.resolve(process.cwd(), cliArg || './public');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function cleanImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const image = sharp(filePath);
  const buffer = ext === '.png' ? await image.png({ force: true }).toBuffer() : await image.jpeg({ force: true }).toBuffer();
  await fs.writeFile(filePath, buffer);
  console.log(`🧼 Cleaned ${ext.toUpperCase()}: ${filePath}`);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function cleanSvg(filePath) {
  const original = await fs.readFile(filePath, 'utf-8');
  const result = optimizeSvg(original, {
    multipass: true,
    plugins: ['removeMetadata', 'removeTitle', 'removeDesc']
  });
  await fs.writeFile(filePath, result.data);
  console.log(`🧼 Optimized SVG: ${filePath}`);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function cleanAudio(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const tmp = `${filePath}.cleaned${ext}`;
  await execAsync(`ffmpeg -i "${filePath}" -map_metadata -1 -c copy -y "${tmp}"`);
  await fs.rename(tmp, filePath);
  console.log(`🧼 Stripped metadata from ${ext.toUpperCase()}: ${filePath}`);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function sanitizeDocument(doc) {
  const root = doc.getRoot();
  const asset = root.getAsset();

  // eslint-disable-next-line functional/immutable-data
  asset.generator = undefined;
  // eslint-disable-next-line functional/immutable-data
  asset.copyright = undefined;

  [
    root.listAccessors(),
    root.listAnimations(),
    root.listBuffers(),
    // root.listBufferViews(),
    root.listCameras(),
    // root.listImages(),
    root.listMaterials(),
    root.listMeshes(),
    root.listNodes(),
    // root.listSamplers(),
    root.listScenes(),
    root.listSkins(),
    root.listTextures()
  ]
    .flat()
    .forEach((item) => {
      item.setExtras({});
    });

  // eslint-disable-next-line functional/no-loop-statements
  for (const extension of root.listExtensions()) {
    extension.dispose();
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function cleanGlb(filePath) {
  try {
    const io = new NodeIO();
    const doc = await io.read(filePath);
    sanitizeDocument(doc);
    await io.write(filePath, doc);
    console.log(`🧼 Cleaned GLB metadata: ${filePath}`);
  } catch (err) {
    console.warn(`⚠️ Failed to clean GLB: ${filePath}`, err.message);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function sanitizeAssets() {
  const files = await fg(['**/*.{png,jpg,jpeg,svg,mp3,ogg,glb,gltf}'], {
    cwd: TARGET_DIR,
    absolute: true
  });

  // eslint-disable-next-line functional/no-loop-statements
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    try {
      if (['.png', '.jpg', '.jpeg'].includes(ext)) await cleanImage(file);
      else if (ext === '.svg') await cleanSvg(file);
      else if (['.mp3', '.ogg'].includes(ext)) await cleanAudio(file);
      else if (['.glb', '.gltf'].includes(ext)) await cleanGlb(file);
    } catch (err) {
      console.warn(`⚠️ Failed to clean ${file}:`, err.message);
    }
  }

  console.log('✅ Done: all assets sanitized');
}

sanitizeAssets();
