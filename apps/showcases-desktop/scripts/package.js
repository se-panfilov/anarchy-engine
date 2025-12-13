import { execSync } from 'node:child_process';
import { resolveMode } from './utils/mode.js';

const mode = resolveMode(process.argv.slice(2));

// Ensure children see MODE and NODE_ENV aligned with the chosen mode
process.env.MODE = mode;
process.env.NODE_ENV = mode;

// Collect electron-builder args (everything except --mode and its value)
const argv = process.argv.slice(2);
const args = argv.filter((a, i, arr) => a !== '--mode' && !a.startsWith('--mode=') && arr[i - 1] !== '--mode');

const run = (cmd) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true });
};

console.log(`[package] mode: ${mode}`);

// 1) Prebuild for the selected mode
run(`node ./scripts/prebuild.js --mode=${mode}`);

// 2) Package with electron-builder and forwarded args
const ebCmd = `npx electron-builder ${args.join(' ')}`.trim();
run(ebCmd);

// 3) Clean postbuild artifacts
run('node ./scripts/clean.js dist/desktop-main.js dist/desktop-main.js.map dist/preload.js dist/preload.js.map dist/dist-desktop');

console.log('[package] done');
