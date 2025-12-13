import { execSync } from 'node:child_process';
import { resolveDryRun, resolveMode } from './utils/mode.js';

const argv = process.argv.slice(2);
const mode = resolveMode(argv);
const dryRun = resolveDryRun(argv);

// Ensure children see MODE and NODE_ENV aligned with the chosen mode
process.env.MODE = mode;
process.env.NODE_ENV = mode;
if (dryRun) process.env.DRY_RUN = '1';

// Collect electron-builder args (everything except --mode and its value, and any dry-run flags)
const args = argv.filter((a, i, arr) => {
  if (a === '--mode' || arr[i - 1] === '--mode') return false;
  if (a.startsWith('--mode=')) return false;
  if (a === '--dry-run' || a === '--dryrun' || a === '--dry') return false;
  return true;
});

const run = (cmd, opts = {}) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true, ...opts });
};

console.log(`[package] mode: ${mode}`);

// 1) Prebuild for the selected mode
run(`node ./scripts/prebuild.js --mode=${mode}${dryRun ? ' --dry-run' : ''}`);

// 2) Package with electron-builder and forwarded args
const ebCmd = `npx electron-builder ${args.join(' ')}`.trim();
run(ebCmd);

// 3) Clean postbuild artifacts via npm script
run('npm run clean:postbuild');

console.log('[package] done');
