// filepath: /Users/splswrd/work/three/apps/showcases-desktop/scripts/utils/mode.js
// Small helpers to parse and normalize build/run modes across scripts.

// Extracts mode from argv supporting "--mode <val>" and "--mode=<val>"
export function parseModeArg(argv = []) {
  const idx = argv.findIndex((a) => a === '--mode');
  if (idx !== -1 && argv[idx + 1]) return argv[idx + 1];
  const eq = argv.find((a) => a.startsWith('--mode='));
  if (eq) return eq.slice('--mode='.length);
  return undefined;
}

// Normalizes common synonyms to canonical values.
// dev -> development, prod -> production
export function normalizeMode(input) {
  if (!input) return 'production';
  const s = String(input).trim().toLowerCase();
  if (s === 'prod' || s === 'production') return 'production';
  if (s === 'dev' || s === 'development') return 'development';
  return s;
}

// Resolves the effective mode from argv and environment.
// Priority: argv -> MODE -> npm_config_mode -> NODE_ENV -> default
export function resolveMode(argv = [], env = process.env) {
  const argMode = parseModeArg(argv);
  const envMode = env.MODE;
  const npmMode = env.npm_config_mode;
  const nodeEnv = env.NODE_ENV;
  return normalizeMode(argMode || envMode || npmMode || nodeEnv || 'production');
}
