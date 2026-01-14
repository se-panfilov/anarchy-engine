import { execSync, spawnSync } from 'node:child_process';
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

// ---- IMPORTANT FIX ----
// electron-builder CLI accepts `--dir`, but *does NOT* accept `nsis` / `AppImage` / etc as a bare arg in your setup.
// So we convert those tokens into `--config.<platform>.target=<Target>` overrides.
const normalizeTargetForEB = (t) => {
  // keep canonical casing for common targets
  const map = {
    appimage: 'AppImage',
    dmg: 'dmg',
    zip: 'zip',
    nsis: 'nsis',
    deb: 'deb',
    rpm: 'rpm',
    'tar.gz': 'tar.gz',
    targz: 'tar.gz',
    portable: 'portable',
    dir: 'dir'
  };
  const key = String(t).trim();
  const lower = key.toLowerCase();
  return map[lower] || key;
};

const wantsDir = parsedInstallers.includes('dir');
const wantedTargets = parsedInstallers.filter((x) => x !== 'dir').map(normalizeTargetForEB);

// Synthesize args from resolution (dedup platform/arch/dir)
const envArgs = [];
for (const p of resolvedPlatforms) envArgs.push(`--${p}`);
for (const a of resolvedArchs) envArgs.push(`--${a}`);
if (hasDirTokenInCli || envDir || wantsDir) envArgs.push('--dir');

// Remove platform/arch/dir flags from CLI to avoid duplicates; also strip tokens like "nsis/AppImage/..." from CLI
// because we now set targets via --config.*.target
const isTargetTkn = (a) => {
  if (a.startsWith('-')) return false;
  const n = normalizeTargetForEB(a).toLowerCase();
  return ['nsis', 'appimage', 'deb', 'rpm', 'dmg', 'zip', 'tar.gz', 'portable', 'dir'].includes(n);
};

const filteredCli = cliArgs.filter((a) => {
  if (platformFlags.includes(a)) return false;
  if (archFlags.includes(a)) return false;
  if (a === '--dir' || a === 'dir') return false;
  if (a === '--portable') return false; // handled as target override
  if (isTargetTkn(a)) return false; // <-- key change
  return true;
});

// Build target overrides (only if user explicitly asked for targets other than dir)
const configOverrides = [];
if (wantedTargets.length > 0) {
  // If multiple targets requested, EB expects array in config; CLI override with JSON works too,
  // but simplest is single-target builds per invocation.
  if (wantedTargets.length > 1) {
    console.warn(`[package] WARN: multiple targets requested (${wantedTargets.join(', ')}). Will build only the first one.`);
  }
  const first = wantedTargets[0];

  // Choose platform for override:
  // - if exactly one platform resolved: override that platform
  // - else: pick based on target type heuristic
  const p = resolvedPlatforms.length === 1 ? resolvedPlatforms[0] : first.toLowerCase() === 'dmg' ? 'mac' : first.toLowerCase() === 'nsis' || first.toLowerCase() === 'portable' ? 'win' : 'linux';

  configOverrides.push(`--config.${p}.target=${first}`);
}

// Compose final EB args
const ebArgs = [...envArgs, ...filteredCli, ...configOverrides].join(' ').trim();

const run = (cmdLine, opts = {}) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmdLine}`);
    return;
  }

  // Cross-platform robust runner:
  // - On Windows, spawnSync with shell helps with npm.cmd resolution.
  // - On *nix, execSync is fine, but spawnSync also works.
  const isWin = process.platform === 'win32';
  if (isWin) {
    const res = spawnSync(cmdLine, {
      stdio: 'inherit',
      env: process.env,
      shell: true,
      ...opts
    });
    if (res.status !== 0) {
      throw new Error(`Command failed (${res.status}): ${cmdLine}`);
    }
    return;
  }

  execSync(cmdLine, { stdio: 'inherit', env: process.env, shell: true, ...opts });
};

console.log(`[package] mode: ${mode}`);
console.log(`[package] platforms: ${resolvedPlatforms.join(', ')}`);
console.log(`[package] archs: ${resolvedArchs.join(', ')}`);
console.log(`[package] targets: ${wantedTargets.length ? wantedTargets.join(', ') : '(none)'}`);
console.log(`[package] dir: ${wantsDir ? 'yes' : 'no'}`);

// Clean prebuild artifacts via npm script
let cleanCmd = '';
if (!dryRun) cleanCmd = 'npm run clean:prebuild && ';

// Prebuild for the selected mode
run(`${cleanCmd}node ./scripts/prebuild.js --mode=${mode}${dryRun ? ' --dry-run' : ''}`);

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
const ebCmd = `npm run build:electron -- ${ebArgs}`.trim();
run(ebCmd);

console.log('[package] done');
