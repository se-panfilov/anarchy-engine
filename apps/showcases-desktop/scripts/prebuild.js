import { execSync } from 'node:child_process';
import path from 'node:path';
import { normalizeMode, resolveDryRun, resolveMode } from './utils/mode.js';

const argv = process.argv.slice(2);
const mode = resolveMode(argv);
const dryRun = resolveDryRun(argv);

// Ensure children see MODE and NODE_ENV aligned with the chosen mode
process.env.MODE = mode;
process.env.NODE_ENV = mode;
if (dryRun) process.env.DRY_RUN = '1';

const run = (cmd, opts = {}) => {
  const prefix = opts.cwd ? `(cwd=${opts.cwd}) ` : '';
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${prefix}${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true, ...opts });
};

console.log(`[prebuild] mode: ${mode}`);

// 0) Build showcases-core for desktop first (needed for assets copied by Vite static copy)
const coreDir = path.resolve(process.cwd(), '../showcases-core');
const coreMode = normalizeMode(mode) === 'development' ? 'dev' : 'production';
const coreScript = `build:${coreMode}:desktop`;
run(`npm run ${coreScript}`, { cwd: coreDir });

// 1) Build Electron main/renderer with default Vite config
run(`npx vite build --mode ${mode}`);

// 2) Build Electron preload with specific config
run(`npx vite build --config vite.preload.config.ts --mode ${mode}`);

console.log('[prebuild] done');
