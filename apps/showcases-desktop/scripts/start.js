import { execSync, spawn } from 'node:child_process';
import { normalizeMode, resolveDryRun, resolveMode } from 'anarchy-shared/ScriptUtils/ModeUtils.js';
import path from 'node:path';
import fs from 'node:fs';

const argv = process.argv.slice(2);
const mode = resolveMode(argv);
const dryRun = resolveDryRun(argv);

// Ensure children see MODE and NODE_ENV aligned with the chosen mode
process.env.MODE = mode;
process.env.NODE_ENV = normalizeMode(mode);
if (dryRun) process.env.DRY_RUN = '1';

const run = (cmd) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true });
};

console.log(`[start] mode: ${mode}`);

// 1) Clean output
run('node ./scripts/clean.js dist');

// 2) Prebuild with proper mode
run(`node ./scripts/prebuild.js --mode=${mode}${dryRun ? ' --dry-run' : ''}`);

// 3) Launch Electron app
const isWin = process.platform === 'win32';
const localElectron = path.resolve(process.cwd(), 'node_modules', '.bin', isWin ? 'electron.cmd' : 'electron');

if (process.env.DRY_RUN === '1') {
  console.log(`[DRY_RUN] ${fs.existsSync(localElectron) ? localElectron : 'electron'} .`);
} else {
  const cmd = fs.existsSync(localElectron) ? localElectron : 'electron';
  const useShell = cmd === 'electron';
  const child = spawn(cmd, ['.'], { stdio: 'inherit', env: process.env, shell: useShell });
  child.on('error', (err) => {
    console.error('[start] Electron failed to launch:', err?.message || err);
    process.exit(1);
  });
  child.on('exit', (code) => process.exit(code ?? 0));
}
