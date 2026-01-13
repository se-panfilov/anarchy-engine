import { loadModeEnv, parseBoolEnv, parseListEnv } from '@hellpig/anarchy-shared/ScriptUtils/EnvUtils.js';
import { normalizeMode, resolveDryRun, resolveMode } from '@hellpig/anarchy-shared/ScriptUtils/ModeUtils.js';
import { execSync } from 'node:child_process';
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

// === electron-builder CLI compatibility ===
// electron-builder doesn't accept targets like "AppImage" as bare positional args.
// Targets must be passed via platform option syntax, e.g.: "--linux appimage".
// We support legacy scripts that pass targets positionally by translating them here.
const PLATFORM_TO_FLAG = {
  mac: '--mac',
  win: '--win',
  linux: '--linux'
};

const pickDefaultPlatformForTargets = () => {
  // Prefer explicit platform flags, then resolvedPlatforms (derived from CLI/env/mode).
  if (resolvedPlatforms.length > 0) return resolvedPlatforms[0];
  return process.platform === 'darwin' ? 'mac' : process.platform === 'win32' ? 'win' : 'linux';
};

const targetsToAppend = (() => {
  if (!Array.isArray(parsedInstallers) || parsedInstallers.length === 0) return [];

  // "dir" is special: electron-builder expects --dir, not a target.
  const asTargets = parsedInstallers.filter((t) => t && t !== 'dir');
  if (asTargets.length === 0) return [];

  const platform = pickDefaultPlatformForTargets();
  const platformFlag = PLATFORM_TO_FLAG[platform] || `--${platform}`;

  // If user already passed e.g. "--linux <target>" in CLI, don't add duplicates.
  const existingTargets = new Set();
  for (let i = 0; i < cliArgs.length; i++) {
    const a = cliArgs[i];
    if (a === '--linux' || a === '--mac' || a === '--win') {
      const maybeTarget = cliArgs[i + 1];
      if (maybeTarget && !maybeTarget.startsWith('-')) existingTargets.add(String(maybeTarget).toLowerCase());
    }
  }

  const out = [];
  for (const t of asTargets) {
    const lower = String(t).toLowerCase();
    if (existingTargets.has(lower)) continue;
    out.push(platformFlag, lower);
  }
  return out;
})();

// Synthesize args from resolution (dedup platform/arch/dir)
const envArgs = [];
for (const p of resolvedPlatforms) envArgs.push(`--${p}`);
for (const a of resolvedArchs) envArgs.push(`--${a}`);
if (hasDirTokenInCli || envDir) envArgs.push('--dir');

// Remove platform/arch/dir flags from CLI to avoid duplicates; also strip '--portable' (we'll add bare 'portable' token below if needed)
// Also strip any positional installer tokens (like "AppImage") because electron-builder won't accept them as free args.
const filteredCli = cliArgs.filter((a, i, arr) => {
  // Drop platform/arch selector flags (we'll re-add via envArgs).
  // IMPORTANT: if a platform flag is used with a target ("--linux appimage"), keep the pair.
  if (platformFlags.includes(a)) {
    const next = arr[i + 1];
    if (next && !next.startsWith('-')) return true;
    return false;
  }
  if (archFlags.includes(a)) return false;

  if (a === '--dir' || a === 'dir') return false;
  if (a === '--portable') return false;

  // strip known installer tokens passed positionally (case-insensitive)
  if (!a.startsWith('-')) {
    const lower = String(a).toLowerCase();
    if (parsedInstallers.includes(lower)) return false;
  }

  return true;
});

// If user passed --portable (flag), convert to 'portable' token for EB
const needsPortableToken = cliArgs.includes('--portable') && !cliArgs.includes('portable'); //gitleaks:allow
const extraTargets = needsPortableToken ? ['portable'] : [];

const ebArgs = [...envArgs, ...filteredCli, ...targetsToAppend, ...extraTargets].join(' ').trim();

const run = (cmd, opts = {}) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true, ...opts });
};

console.log(`[package] mode: ${mode}`);

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

// Clean postbuild artifacts via npm script
// run('npm run clean:postbuild'); //Do not clean, since we need sourcemaps for Sentry

console.log('[package] done');
