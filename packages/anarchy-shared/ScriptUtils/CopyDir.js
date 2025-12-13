import { copy } from 'fs-extra';
import { resolve } from 'path';

const args = process.argv.slice(2);
const fromArg = args.find((arg) => arg.startsWith('from='));
const toArg = args.find((arg) => arg.startsWith('to='));

const fromPath = resolve(process.cwd(), fromArg.split('=')[1]);
const toPath = resolve(process.cwd(), toArg.split('=')[1]);

console.log(`Copying files...\nFrom: ${fromPath}\nTo:   ${toPath}`);

try {
  await copy(fromPath, toPath, {
    overwrite: true,
    errorOnExist: false,
    recursive: true
  });

  console.log('✅ Copy completed.');
} catch (err) {
  console.error('Copy failed:', err);
  process.exit(1);
}
