import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { normalizeMode, resolveDryRun, resolveMode } from './utils/mode.js';
import { config as dotenvConfig } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';

const argv = process.argv.slice(2);
const mode = resolveMode(argv);
const dryRun = resolveDryRun(argv);

// Ensure children see MODE and NODE_ENV aligned with the chosen mode
process.env.MODE = mode;
process.env.NODE_ENV = normalizeMode(mode);
if (dryRun) process.env.DRY_RUN = '1';

// Load .env files for composite modes to augment Vite's built-in loading
const root = process.cwd();
const loadEnvFile = (file) => {
  const full = path.resolve(root, file);
  if (!fs.existsSync(full)) return false;
  const result = dotenvConfig({ path: full, override: true });
  if (result.parsed) dotenvExpand({ parsed: result.parsed });
  return true;
};

const buildEnvChain = (m) => {
  // Always include base envs first
  const chain = ['.env', '.env.local'];
  const parts = String(m).split('.');
  // If the first token is a known base (production/development), start from it; otherwise still chain progressively
  const accum = [];
  for (const p of parts) {
    accum.push(p);
    const key = accum.join('.');
    chain.push(`.env.${key}`);
    chain.push(`.env.${key}.local`);
  }
  return chain;
};

const chain = buildEnvChain(mode);
for (const file of chain) loadEnvFile(file);

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
const coreMode = normalizeMode(mode) === 'dev' || normalizeMode(mode) === 'development' ? 'dev' : 'production';
const coreScript = `build:${coreMode}:desktop`;
run(`npm run ${coreScript}`, { cwd: coreDir });

// 1) Build Electron main/renderer with default Vite config
run(`npx vite build --mode ${mode}`);

// 2) Build Electron preload with specific config
run(`npx vite build --config vite.preload.config.ts --mode ${mode}`);

console.log('[prebuild] done');
