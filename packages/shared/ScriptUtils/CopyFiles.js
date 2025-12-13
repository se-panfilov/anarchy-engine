import { copyFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';

const args = process.argv.slice(2);

// last arg must be the destination (e.g. to=game-dist/draco)
const toArg = args.find((arg) => arg.startsWith('to='));
if (!toArg) {
  console.error('❌ Missing argument: to=<destination folder>');
  process.exit(1);
}

const toDir = resolve(process.cwd(), toArg.split('=')[1]);

// all other args treated as relative file paths to copy
const filePaths = args.filter((arg) => !arg.startsWith('to='));
if (filePaths.length === 0) {
  console.error('❌ No files to copy provided.');
  process.exit(1);
}

console.log(`Copying files to: ${toDir}`);
console.log(filePaths.map((f) => `  - ${f}`).join('\n'));

(async () => {
  try {
    for (const relativePath of filePaths) {
      const src = resolve(process.cwd(), relativePath);
      const dest = resolve(toDir, relativePath.split('/').pop());

      await mkdir(dirname(dest), { recursive: true });
      await copyFile(src, dest);
    }

    console.log('✅ Files copied successfully.');
  } catch (err) {
    console.error('❌ Copy failed:', err);
    process.exit(1);
  }
})();
