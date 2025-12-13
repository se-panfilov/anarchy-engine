import { loadModeEnv, parseBoolEnv, parseListEnv } from 'anarchy-shared/ScriptUtils/EnvUtils.js';
import { normalizeMode, resolveDryRun, resolveMode } from 'anarchy-shared/ScriptUtils/ModeUtils.js';
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

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

// Extract explicit target tokens (e.g., dmg, nsis, AppImage, dir) from remaining CLI args
const explicitTargets = cliArgs.filter((a) => !a.startsWith('-'));
const hasDirTokenInCli = cliArgs.includes('--dir') || explicitTargets.includes('dir');

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

// Synthesize args from resolution (dedup platform/arch/dir)
const envArgs = [];
for (const p of resolvedPlatforms) envArgs.push(`--${p}`);
for (const a of resolvedArchs) envArgs.push(`--${a}`);
const shouldAddDirFromEnv = envDir && !hasDirTokenInCli;
if (hasDirTokenInCli || shouldAddDirFromEnv) envArgs.push('--dir');

// Remove platform/arch/dir flags from CLI to avoid duplicates and rely on synthesized flags above
const filteredCli = cliArgs.filter((a) => !platformFlags.includes(a) && !archFlags.includes(a) && a !== '--dir' && a !== 'dir');

const ebArgs = [...envArgs, ...filteredCli].join(' ').trim();

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
  // Resolve output directory from electron-builder config default ("dist") relative to this workspace
  const outDir = path.resolve(process.cwd(), 'dist');
  mkdirSync(outDir, { recursive: true });

  // Use the resolved sets (include CLI flags if present)
  const platforms = resolvedPlatforms;
  const archs = resolvedArchs;

  // Effective installers: start with explicit tokens; add 'dir' if either CLI specified it or env adds it
  const installers = [...explicitTargets];
  if (hasDirTokenInCli || shouldAddDirFromEnv) installers.push('dir');
  const installersDedup = Array.from(new Set(installers));

  const primaryPlatform = platforms[0];
  const primaryArch = archs[0];
  const distName = `${primaryPlatform}-${primaryArch}`;

  const info = {
    mode,
    platforms,
    archs,
    installers: installersDedup,
    platform: primaryPlatform,
    arch: primaryArch,
    distName
  };

  const infoPath = path.join(outDir, 'dist-info.json');
  writeFileSync(infoPath, JSON.stringify(info, null, 2));
  console.log(`[package] wrote ${path.relative(process.cwd(), infoPath)} → ${distName}`);
} catch (err) {
  console.warn('[package] WARN: failed to write dist-info.json', err);
}

// Package with electron-builder and merged args
const ebCmd = `npm run build:electron -- ${ebArgs}`.trim();
run(ebCmd);

// Clean postbuild artifacts via npm script
// run('npm run clean:postbuild'); //Do not clean, since we need sourcemaps for Sentry

console.log('[package] done');
