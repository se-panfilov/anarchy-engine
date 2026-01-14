import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

import { loadModeEnv, parseBoolEnv, parseListEnv } from '@hellpig/anarchy-shared/ScriptUtils/EnvUtils.js';
import { normalizeMode, resolveDryRun, resolveMode } from '@hellpig/anarchy-shared/ScriptUtils/ModeUtils.js';

import { parseInstallersFromCli, writeDistInfo } from './utils.js';

const argv = process.argv.slice(2);
const mode = resolveMode(argv);
const dryRun = resolveDryRun(argv);

// Ensure children see MODE (full) and NODE_ENV (normalized) aligned with the chosen mode
process.env.MODE = mode;
process.env.NODE_ENV = normalizeMode(mode);
if (dryRun) process.env.DRY_RUN = '1';

// Load env for composite modes so PACK_* variables are available
loadModeEnv(mode);

// Collect electron-builder args (everything except --mode and its value, and any dry-run flags)
const cliArgs = argv.filter((a, i, arr) => {
  if (a === '--mode' || arr[i - 1] === '--mode') return false;
  if (a.startsWith('--mode=')) return false;

  if (a === '--dry-run' || a === '--dryrun' || a === '--dry') return false;
  if (a.startsWith('--dry-run=')) return false;
  return true;
});

const hasAny = (list) => list.some((f) => cliArgs.includes(f));
const platformFlags = ['--mac', '--win', '--linux'];
const archFlags = ['--x64', '--arm64', '--universal'];

const hasPlatformFlags = hasAny(platformFlags);
const hasArchFlags = hasAny(archFlags);

// Derive defaults from MODE tokens if env not set and CLI not overriding
const tokens = String(mode).toLowerCase().split('.').filter(Boolean);
const modePlatform = tokens.includes('mac') ? 'mac' : tokens.includes('win') ? 'win' : tokens.includes('linux') ? 'linux' : undefined;
const modeArchs = ['x64', 'arm64', 'universal'].filter((a) => tokens.includes(a));

// Read from env
const envPlatforms = parseListEnv(process.env.PACK_PLATFORMS || process.env.PACK_PLATFORM);
const envArchs = parseListEnv(process.env.PACK_ARCHS || process.env.PACK_ARCH);
const envDir = parseBoolEnv(process.env.PACK_DIR, false);

// Helper: parse platforms/archs from CLI flags
const parsePlatformsFromCli = () => {
  const out = [];
  if (cliArgs.includes('--mac')) out.push('mac');
  if (cliArgs.includes('--win')) out.push('win');
  if (cliArgs.includes('--linux')) out.push('linux');
  return out;
};
const parseArchsFromCli = () => {
  const out = [];
  if (cliArgs.includes('--x64')) out.push('x64');
  if (cliArgs.includes('--arm64')) out.push('arm64');
  if (cliArgs.includes('--universal')) out.push('universal');
  return out;
};

// Final resolution with precedence: CLI > ENV > MODE > OS defaults
const resolvedPlatforms = hasPlatformFlags
  ? parsePlatformsFromCli()
  : envPlatforms.length > 0
    ? envPlatforms
    : modePlatform
      ? [modePlatform]
      : [process.platform === 'darwin' ? 'mac' : process.platform === 'win32' ? 'win' : 'linux'];

const resolvedArchs = hasArchFlags ? parseArchsFromCli() : envArchs.length > 0 ? envArchs : modeArchs.length > 0 ? modeArchs : [process.arch === 'arm64' ? 'arm64' : 'x64'];

// Parse installers/targets using shared util (handles dir, portable, etc.)
const { installers: parsedInstallers, hasDirTokenInCli } = parseInstallersFromCli(cliArgs, { envDir });

// Synthesize args from resolution (dedup platform/arch/dir)
const envArgs = [];
for (const p of resolvedPlatforms) envArgs.push(`--${p}`);
for (const a of resolvedArchs) envArgs.push(`--${a}`);
if (hasDirTokenInCli || envDir) envArgs.push('--dir');

// Remove platform/arch/dir flags from CLI to avoid duplicates; also strip '--portable' (we'll add bare 'portable' token below if needed)
const filteredCli = cliArgs.filter((a) => !platformFlags.includes(a) && !archFlags.includes(a) && a !== '--dir' && a !== 'dir' && a !== '--portable');

// If user passed --portable (flag), convert to 'portable' token for EB
const needsPortableToken = cliArgs.includes('--portable') && !cliArgs.includes('portable'); // gitleaks:allow
const extraTargets = needsPortableToken ? ['portable'] : [];

// ---- publish policy (important for CI stability) ----
// If user explicitly provided --publish (or PACK_PUBLISH), we respect it.
// Otherwise default to '--publish never' to prevent accidental publishing.
const userProvidedPublish = cliArgs.some((a) => a === '--publish' || a.startsWith('--publish=')) || typeof process.env.PACK_PUBLISH === 'string';

const publishArgs = userProvidedPublish ? [] : ['--publish', 'never'];

const ebArgsList = [...envArgs, ...filteredCli, ...extraTargets, ...publishArgs].filter(Boolean);

// ---------- Cross-platform command runner ----------
const isWin = process.platform === 'win32';

function quoteCmdArgWindows(s) {
  // Minimal safe quoting for cmd.exe
  // Wrap in quotes if contains spaces or special chars
  if (s === '') return '""';
  if (!/[ \t&()[]{}^=;!'+,`~|<>"]/g.test(s)) return s;
  // Escape inner quotes by doubling
  return `"${s.replaceAll('"', '""')}"`;
}

function run(cmd, args = [], opts = {}) {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd} ${args.join(' ')}`);
    return;
  }

  const env = { ...process.env, ...(opts.env ?? {}) };
  const cwd = opts.cwd ?? process.cwd();

  if (isWin) {
    // IMPORTANT: run via cmd.exe so .cmd/.bat work reliably.
    const cmdLine = [cmd, ...args].map(quoteCmdArgWindows).join(' ');
    const res = spawnSync('cmd.exe', ['/d', '/s', '/c', cmdLine], {
      stdio: 'inherit',
      env,
      cwd
    });

    if (res.error) {
      throw new Error(`Command failed to start: ${cmdLine}\nerror: ${res.error.message}`);
    }
    if (res.status !== 0) {
      throw new Error(`Command failed (${res.status}): ${cmdLine}`);
    }
    return;
  }

  // POSIX
  const res = spawnSync(cmd, args, {
    stdio: 'inherit',
    env,
    cwd
  });

  if (res.error) {
    throw new Error(`Command failed to start: ${cmd} ${args.join(' ')}\nerror: ${res.error.message}`);
  }
  if (res.status !== 0) {
    throw new Error(`Command failed (${res.status}): ${cmd} ${args.join(' ')}`);
  }
}

// ----------------- Main flow -----------------
console.log(`[package] mode: ${mode}`);
console.log(`[package] platforms: ${resolvedPlatforms.join(', ') || '(none)'}`);
console.log(`[package] archs: ${resolvedArchs.join(', ') || '(none)'}`);
console.log(`[package] targets: ${parsedInstallers.length ? parsedInstallers.join(', ') : '(none)'}`);
console.log(`[package] dir: ${hasDirTokenInCli || envDir ? 'yes' : 'no'}`);

// Clean prebuild artifacts via npm script
// NOTE: we call `npm` (NOT npm.cmd) and on Windows it runs through cmd.exe /c
if (!dryRun) {
  run('npm', ['run', 'clean:prebuild']);
}

// Prebuild for the selected mode
run('node', ['./scripts/prebuild.js', `--mode=${mode}`, ...(dryRun ? ['--dry-run'] : [])]);

// === Write dist-info.json early for downstream tools (e.g., Sentry sourcemaps) ===
try {
  const outDir = path.resolve(process.cwd(), 'dist');
  mkdirSync(outDir, { recursive: true });

  // Map EB platform tokens to Node.js platform tokens for storage in dist-info
  const mapEbToNodePlatform = (p) => (p === 'mac' ? 'darwin' : p === 'win' ? 'win32' : p);
  const platformsForInfo = resolvedPlatforms.map(mapEbToNodePlatform);

  const { path: infoPath } = writeDistInfo({
    mode,
    platforms: platformsForInfo,
    archs: resolvedArchs,
    installers: parsedInstallers,
    outDir
  });

  console.log(`[package] wrote ${path.relative(process.cwd(), infoPath)}`);
} catch (err) {
  console.warn('[package] WARN: failed to write dist-info.json', err);
}

// Package with electron-builder and merged args
// We intentionally run via npm script to keep environment consistent with workspace tooling.
run('npm', ['run', 'build:electron', '--', ...ebArgsList]);

console.log('[package] done');
