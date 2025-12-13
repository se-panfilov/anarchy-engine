import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const SCREENSHOT_DIR = path.resolve(process.cwd(), './src');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function processPng(filePath) {
  const outputPath = filePath;
  const buffer = await sharp(filePath)
    .png({ force: true }) // 👈 без .withMetadata()
    .toBuffer();
  await fs.writeFile(outputPath, buffer);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function processAllPngs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  // eslint-disable-next-line functional/no-loop-statements
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
