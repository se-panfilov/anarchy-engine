// Small helpers to parse and normalize build/run modes across scripts.

// Extracts mode from argv supporting "--mode <val>" and "--mode=<val>"
export function parseModeArg(argv = []) {
  const idx = argv.findIndex((a) => a === '--mode');
  if (idx !== -1 && argv[idx + 1]) return argv[idx + 1];
  const eq = argv.find((a) => a.startsWith('--mode='));
  if (eq) return eq.slice('--mode='.length);
  return undefined;
}

// Normalizes common synonyms to canonical values and classifies composite modes.
// dev -> development, prod -> production
// development.* -> development, production.* -> production
export function normalizeMode(input) {
  if (!input) return 'production';
  const s = String(input).trim().toLowerCase();
  if (s === 'prod' || s === 'production' || s.startsWith('production.')) return 'production';
  if (s === 'dev' || s === 'development' || s.startsWith('development.')) return 'development';
  return s;
}

// Resolves the effective mode from argv and environment WITHOUT normalizing,
// so Vite receives the full composite value (e.g., production.mac.arm64).
// Priority: argv -> MODE -> npm_config_mode -> NODE_ENV -> default
export function resolveMode(argv = [], env = process.env) {
  const argMode = parseModeArg(argv);
  const envMode = env.MODE;
  const npmMode = env.npm_config_mode;
  const nodeEnv = env.NODE_ENV;
  return argMode || envMode || npmMode || nodeEnv || 'production';
}

// Detects a dry-run flag in argv.
export function parseDryRunArg(argv = []) {
  return argv.some((a) => a === '--dry-run' || a === '--dryrun' || a === '--dry');
}

// Resolves whether to run in dry-run mode from argv and environment.
export function resolveDryRun(argv = [], env = process.env) {
  return env.DRY_RUN === '1' || parseDryRunArg(argv);
}
