import { loadModeEnv, parseBoolEnv, parseListEnv } from 'anarchy-shared/ScriptUtils/EnvUtils.js';
import { normalizeMode, resolveDryRun, resolveMode } from 'anarchy-shared/ScriptUtils/ModeUtils.js';
import { execSync } from 'node:child_process';

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
const hasPlatformFlags = hasAny(['--mac', '--win', '--linux']);
const hasArchFlags = hasAny(['--x64', '--arm64', '--universal']);
const hasDirFlag = hasAny(['--dir']);

// Derive defaults from MODE tokens if env not set and CLI not overriding
const tokens = String(mode).toLowerCase().split('.').filter(Boolean);
const modePlatform = tokens.includes('mac') ? 'mac' : tokens.includes('win') ? 'win' : tokens.includes('linux') ? 'linux' : undefined;
const modeArchs = ['x64', 'arm64', 'universal'].filter((a) => tokens.includes(a));

// Read from env
const envPlatforms = parseListEnv(process.env.PACK_PLATFORMS || process.env.PACK_PLATFORM);
const envArchs = parseListEnv(process.env.PACK_ARCHS || process.env.PACK_ARCH);
const envDir = parseBoolEnv(process.env.PACK_DIR, false);

// Final resolution with precedence: CLI > ENV > MODE > OS defaults
const resolvedPlatforms = hasPlatformFlags
  ? []
  : envPlatforms.length > 0
    ? envPlatforms
    : modePlatform
      ? [modePlatform]
      : [process.platform === 'darwin' ? 'mac' : process.platform === 'win32' ? 'win' : 'linux'];

const resolvedArchs = hasArchFlags ? [] : envArchs.length > 0 ? envArchs : modeArchs.length > 0 ? modeArchs : [process.arch === 'arm64' ? 'arm64' : 'x64'];

const resolvedDir = hasDirFlag ? undefined : envDir; // undefined means don't add any flag; true -> add --dir

// Synthesize args from resolution
const envArgs = [];
for (const p of resolvedPlatforms) envArgs.push(`--${p}`);
for (const a of resolvedArchs) envArgs.push(`--${a}`);
if (resolvedDir) envArgs.push('--dir');

const ebArgs = [...envArgs, ...cliArgs].join(' ').trim();

const run = (cmd, opts = {}) => {
  if (process.env.DRY_RUN === '1') {
    console.log(`[DRY_RUN] ${cmd}`);
    return;
  }
  execSync(cmd, { stdio: 'inherit', env: process.env, shell: true, ...opts });
};

console.log(`[package] mode: ${mode}`);

// 0) Clean prebuild artifacts via npm script
let cleanCmd = '';
if (!dryRun) cleanCmd = 'npm run clean:prebuild && ';

// 1) Prebuild for the selected mode
run(`${cleanCmd}node ./scripts/prebuild.js --mode=${mode}${dryRun ? ' --dry-run' : ''}`);

// 2) Package with electron-builder and merged args
const ebCmd = `npx electron-builder ${ebArgs}`.trim();
run(ebCmd);

// 3) Clean postbuild artifacts via npm script
run('npm run clean:postbuild');

console.log('[package] done');
