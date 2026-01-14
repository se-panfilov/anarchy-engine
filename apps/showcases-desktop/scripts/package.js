import { loadModeEnv, parseBoolEnv, parseListEnv } from '@hellpig/anarchy-shared/ScriptUtils/EnvUtils.js';
import { normalizeMode, resolveDryRun, resolveMode } from '@hellpig/anarchy-shared/ScriptUtils/ModeUtils.js';
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
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

// Determine whether we need --dir
const wantsDir = hasDirTokenInCli || envDir || parsedInstallers.includes('dir');

// Convert "--portable" flag (if present) into "portable" target token (for EB)
const needsPortableToken = cliArgs.includes('--portable') && !cliArgs.includes('portable'); //gitleaks:allow
const normalizedTargets = [...parsedInstallers.filter((t) => t !== 'dir'), ...(needsPortableToken ? ['portable'] : [])];

// Remove platform/arch/dir/portable flags and bare target tokens from CLI to avoid duplicates.
// Important: we will place targets right after platform flag instead (e.g. "--linux AppImage").
const filteredCli = cliArgs.filter((a) => {
  if (platformFlags.includes(a)) return false;
  if (archFlags.includes(a)) return false;
  if (a === '--dir' || a === 'dir') return false;
  if (a === '--portable') return false;

  // Also strip any explicit target tokens (non-dash) because we will re-add them in correct position.
  // parseInstallersFromCli treats non-dash tokens as explicitTokens.
  if (!a.startsWith('-')) return false;

  return true;
});

// Ensure we don't accidentally publish from CI/manual runs.
// If user explicitly passed "--publish ..." keep it.
const hasPublishInCli = filteredCli.some((a) => a === '--publish' || a.startsWith('--publish='));
const publishArgs = hasPublishInCli ? [] : ['--publish', 'never'];

// Build electron-builder args as ARRAY in correct order:
// 1) platform flag + its targets (if any)  2) arch flags  3) --dir (if needed)  4) publish  5) remaining flags
const buildEbArgsArray = () => {
  const args = [];

  // Platform flags with targets immediately after them (this fixes AppImage parsing)
  for (const p of resolvedPlatforms) {
    args.push(`--${p}`);
    // Apply the same targets to the chosen platform(s).
    // In your current usage you build one platform at a time, so this is correct.
    for (const t of normalizedTargets) args.push(t);
  }

  // Arch flags
  for (const a of resolvedArchs) args.push(`--${a}`);

  // Dir mode
  if (wantsDir) args.push('--dir');

  // Publish control
  args.push(...publishArgs);

  // Remaining flags (e.g. --config, --projectDir, etc.)
  args.push(...filteredCli);

  // De-dup adjacent duplicates just in case
  const out = [];
  for (const x of args) {
    if (out.length === 0 || out[out.length - 1] !== x) out.push(x);
  }
  return out;
};

const run = (cmd, args, opts = {}) => {
  if (process.env.DRY_RUN === '1') {
    console.log('[DRY_RUN]', cmd, ...args);
    return;
  }
  const res = spawnSync(cmd, args, {
    stdio: 'inherit',
    env: process.env,
    ...opts
  });
  if (res.status !== 0) {
    throw new Error(`Command failed (${res.status}): ${cmd} ${args.join(' ')}`);
  }
};

// npm executable name differs on Windows
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

console.log(`[package] mode: ${mode}`);
console.log(`[package] platforms: ${resolvedPlatforms.join(', ')}`);
console.log(`[package] archs: ${resolvedArchs.join(', ')}`);
console.log(`[package] targets: ${normalizedTargets.join(', ') || '(none)'}`);
console.log(`[package] dir: ${wantsDir ? 'yes' : 'no'}`);

// Clean prebuild artifacts via npm script
if (!dryRun) {
  run(npmCmd, ['run', 'clean:prebuild']);
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
    installers: [...normalizedTargets, ...(wantsDir ? ['dir'] : [])],
    outDir
  });
  console.log(`[package] wrote ${path.relative(process.cwd(), infoPath)}`);
} catch (err) {
  console.warn('[package] WARN: failed to write dist-info.json', err);
}

// Package with electron-builder
const ebArgs = buildEbArgsArray();
console.log('[package] electron-builder args:', ebArgs.join(' '));

// npm run build:electron -- <args...>
run(npmCmd, ['run', 'build:electron', '--', ...ebArgs]);

console.log('[package] done');
