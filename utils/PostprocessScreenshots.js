import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), './e2e');

async function processPng(filePath) {
  const outputPath = filePath;
  const buffer = await sharp(filePath)
    .png({ force: true }) // 👈 без .withMetadata()
    .toBuffer();
  await fs.writeFile(outputPath, buffer);
}

async function processAllPngs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processAllPngs(fullPath);
    } else if (entry.name.toLowerCase().endsWith('.png')) {
      await processPng(fullPath);
      console.log(`🧼 Cleaned metadata: ${fullPath}`);
    }
  }
}

processAllPngs(SCREENSHOT_DIR)
  .then(() => console.log('✅ Screenshot metadata cleanup complete'))
  .catch((err) => {
    console.error('❌ Failed to clean screenshots:', err);
    process.exit(1);
  });
