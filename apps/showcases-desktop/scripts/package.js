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

// If user passed --portable (flag), convert to 'portable' target for EB
const needsPortableTarget = cliArgs.includes('--portable') && !cliArgs.includes('portable'); //gitleaks:allow

// Build final target list (for electron-builder platform option values)
const finalTargets = [...parsedInstallers];

// Ensure dir target is present if requested by token or env
if ((hasDirTokenInCli || envDir) && !finalTargets.includes('dir')) {
  finalTargets.push('dir');
}

// Ensure portable target is present if requested via flag
if (needsPortableTarget && !finalTargets.includes('portable')) {
  finalTargets.push('portable');
}

// Remove platform/arch/dir/portable flags & tokens from CLI to avoid duplicates.
// Important: targets like "AppImage" MUST be placed right after --linux/--win/--mac,
// not left as positional args at the end.
const filteredCli = cliArgs.filter((a) => {
  if (platformFlags.includes(a)) return false;
  if (archFlags.includes(a)) return false;

  // strip dir forms
  if (a === '--dir' || a === 'dir') return false;

  // strip portable forms
  if (a === '--portable' || a === 'portable') return false;

  // strip known/parsed targets (e.g. AppImage, dmg, nsis, zip, deb, rpm, etc.)
  if (finalTargets.includes(a)) return false;

  return true;
});

// === Build electron-builder args in the correct order ===
// For electron-builder CLI: --linux/--win/--mac accept a target list (array).
// So we must do: --linux AppImage (not: --linux --x64 AppImage).
const ebArgsList = [];

// platform + targets (targets must be adjacent to the platform option)
for (const p of resolvedPlatforms) {
  ebArgsList.push(`--${p}`);
  for (const t of finalTargets) {
    ebArgsList.push(t);
  }
}

// arch flags
for (const a of resolvedArchs) {
  ebArgsList.push(`--${a}`);
}

// rest of cli args
ebArgsList.push(...filteredCli);

const ebArgs = ebArgsList.join(' ').trim();

const run = (cmd, opts = {}) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true, ...opts });
};

console.log(`[package] mode: ${mode}`);
console.log(`[package] platforms: ${resolvedPlatforms.join(', ')}`);
console.log(`[package] archs: ${resolvedArchs.join(', ')}`);
console.log(`[package] targets: ${finalTargets.join(', ') || '(default from config)'}`);

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
    installers: finalTargets.length ? finalTargets : parsedInstallers,
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
