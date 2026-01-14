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
const tkns = String(mode).toLowerCase().split('.').filter(Boolean);
const modePlatform = tkns.includes('mac') ? 'mac' : tkns.includes('win') ? 'win' : tkns.includes('linux') ? 'linux' : undefined;

const modeArchs = ['x64', 'arm64', 'universal'].filter((a) => tkns.includes(a));

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

// ---------- Target normalization & override strategy ----------
const normalizeTargetForEB = (t) => {
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

// Identify “target tokens” in CLI so we can strip them (avoid passing bare `nsis`, `AppImage`, etc.)
const isTargetTkn = (a) => {
  if (a.startsWith('-')) return false;
  const n = normalizeTargetForEB(a).toLowerCase();
  return ['nsis', 'appimage', 'deb', 'rpm', 'dmg', 'zip', 'tar.gz', 'portable', 'dir'].includes(n);
};

// Synthesize args from platform/arch resolution (dedup platform/arch/dir)
const envArgs = [];
for (const p of resolvedPlatforms) envArgs.push(`--${p}`);
for (const a of resolvedArchs) envArgs.push(`--${a}`);
if (hasDirTokenInCli || envDir || wantsDir) envArgs.push('--dir');

// Remove platform/arch/dir flags from CLI to avoid duplicates;
// also strip '--portable' (we treat it as target via parseInstallersFromCli -> 'portable');
const filteredCli = cliArgs.filter((a) => {
  if (platformFlags.includes(a)) return false;
  if (archFlags.includes(a)) return false;
  if (a === '--dir' || a === 'dir') return false;
  if (a === '--portable') return false;
  if (isTargetTkn(a)) return false;
  return true;
});

// Build target overrides (only if user explicitly asked for targets other than dir)
const configOverrides = [];
if (wantedTargets.length > 0) {
  if (wantedTargets.length > 1) {
    console.warn(`[package] WARN: multiple targets requested (${wantedTargets.join(', ')}). Will build only the first one.`);
  }
  const first = wantedTargets[0];

  // Choose platform for override:
  // - if exactly one platform resolved: override that platform
  // - else: heuristic based on target type
  const lower = first.toLowerCase();
  const inferred = lower === 'dmg' ? 'mac' : lower === 'nsis' || lower === 'portable' ? 'win' : 'linux';

  const p = resolvedPlatforms.length === 1 ? resolvedPlatforms[0] : inferred;
  configOverrides.push(`--config.${p}.target=${first}`);
}

// ---- publish policy (important for CI stability) ----
// If user explicitly provided --publish (or PACK_PUBLISH), we respect it.
// Otherwise default to '--publish=never' to prevent accidental publishing.
const userProvidedPublish = cliArgs.some((a) => a === '--publish' || a.startsWith('--publish=')) || typeof process.env.PACK_PUBLISH === 'string';

const publishArgs = userProvidedPublish ? [] : ['--publish=never'];

const ebArgsList = [...envArgs, ...filteredCli, ...configOverrides, ...publishArgs].filter(Boolean);

// ---------- Cross-platform command runner ----------
const isWin = process.platform === 'win32';

function quoteCmdArgWindows(s) {
  // Minimal safe quoting for cmd.exe
  if (s === '') return '""';
  if (!/[ \t&()[]{}^=;!'+,`~|<>"]/g.test(s)) return s;
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
console.log(`[package] targets: ${wantedTargets.length ? wantedTargets.join(', ') : '(none)'}`);
console.log(`[package] dir: ${hasDirTokenInCli || envDir || wantsDir ? 'yes' : 'no'}`);
console.log(`[package] publish: ${userProvidedPublish ? '(user provided)' : 'never (default)'}`);
console.log(`[package] eb args: ${ebArgsList.join(' ')}`);

// Clean prebuild artifacts via npm script
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
run('npm', ['run', 'build:electron', '--', ...ebArgsList]);

console.log('[package] done');
