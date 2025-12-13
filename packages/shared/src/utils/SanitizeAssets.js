import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { optimize as optimizeSvg } from 'svgo';
import fg from 'fast-glob';
import { exec } from 'child_process';
import { promisify } from 'util';
import { NodeIO } from '@gltf-transform/core';

const execAsync = promisify(exec);
const TARGET_DIR = path.resolve(process.cwd(), './public');

async function cleanImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const image = sharp(filePath);
  const buffer = ext === '.png' ? await image.png({ force: true }).toBuffer() : await image.jpeg({ force: true }).toBuffer();
  await fs.writeFile(filePath, buffer);
  console.log(`🧼 Cleaned ${ext.toUpperCase()}: ${filePath}`);
}

async function cleanSvg(filePath) {
  const original = await fs.readFile(filePath, 'utf-8');
  const result = optimizeSvg(original, {
    multipass: true,
    plugins: ['removeMetadata', 'removeTitle', 'removeDesc']
  });
  await fs.writeFile(filePath, result.data);
  console.log(`🧼 Optimized SVG: ${filePath}`);
}

async function cleanMp3(filePath) {
  const tmp = filePath + '.cleaned.mp3';
  await execAsync(`ffmpeg -i "${filePath}" -map_metadata -1 -y "${tmp}"`);
  await fs.rename(tmp, filePath);
  console.log(`🧼 Stripped metadata from MP3: ${filePath}`);
}

function sanitizeDocument(doc) {
  const root = doc.getRoot();

  // Удаляем asset.generator
  root.getAsset().generator = undefined;

  // Удаляем extras из всех объектов
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
      item.setExtras(undefined);
    });

  // Удаляем пустые extensions (если есть)
  for (const extension of root.listExtensions()) {
    root.unregisterExtension(extension);
  }
}

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

async function sanitizeAssets() {
  const files = await fg(['**/*.{png,jpg,jpeg,svg,mp3,ogg,glb,gltf}'], {
    cwd: TARGET_DIR,
    absolute: true
  });

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    try {
      if (['.png', '.jpg', '.jpeg'].includes(ext)) await cleanImage(file);
      else if (ext === '.svg') await cleanSvg(file);
      else if (['.mp3', '.ogg'].includes(ext)) await cleanMp3(file);
      else if (['.glb'].includes(ext)) await cleanGlb(file);
    } catch (err) {
      console.warn(`⚠️ Failed to clean ${file}:`, err.message);
    }
  }

  console.log('✅ Done: all assets sanitized');
}

sanitizeAssets();
