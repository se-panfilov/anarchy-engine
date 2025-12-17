import { execSync, spawn } from 'node:child_process';
import { normalizeMode, resolveDryRun, resolveMode } from '@hellpig/anarchy-shared/ScriptUtils/ModeUtils.js';
import path from 'node:path';
import fs from 'node:fs';
import { writeDistInfo } from './utils.js';

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

// 3) Write dist-info.json for dev run (treat as 'dir' target)
try {
  const platform = process.platform; // keep as-is (darwin/win32/linux)
  const arch = process.arch; // keep as-is (arm64/x64/...)
  const outDir = path.resolve(process.cwd(), 'dist');
  const { path: infoPath } = writeDistInfo({ mode, platforms: [platform], archs: [arch], installers: ['dir'], outDir });
  console.log(`[start] wrote ${path.relative(process.cwd(), infoPath)}`);
} catch (err) {
  console.warn('[start] WARN: failed to write dist-info.json', err);
}

// 4) Launch Electron app
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
