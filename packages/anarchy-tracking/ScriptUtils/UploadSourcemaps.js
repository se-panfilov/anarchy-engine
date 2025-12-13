#!/usr/bin/env node
import { join, resolve } from 'path';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import * as dotenv from 'dotenv';

/* Minimal Sentry sourcemaps uploader for Vite/Electron builds.
 * Features:
 *  - release: from --release | $RELEASE | "<VITE_RELEASE_NAME_PREFIX>@$npm_package_version"
 *  - build dir: from --dist | positional | "dist"
 *  - sentry dist-name: --dist-name | --sentry-dist | $DIST (e.g., "darwin-arm64", "web")
 *  - urlPrefix: --url-prefix | auto from Vite "base" | "~/" fallback
 *  - dev-guard (ON by default): blocks upload unless mode=production; can disable via --no-dev-guard
 *  - org/project overrides: --org, --project (otherwise read from .sentryclirc)
 *  - dry-run: prints what would happen
 *
 * Requirements:
 *  - @sentry/cli must be available (devDependency in this package is fine)
 *  - SENTRY_AUTH_TOKEN must be provided via env (e.g., .env.local), NOT committed
 */

// Load .env* files (from the folder where this script is run)
function loadEnvFromCwd(mode) {
  const cwd = process.cwd();
  const list = [join(cwd, '.env'), join(cwd, '.env.local'), join(cwd, `.env.${mode}`), join(cwd, `.env.${mode}.local`)];
  console.log('Reading env files:', list.join(', \n'));
  for (const p of list) {
    if (existsSync(p)) dotenv.config({ path: p });
  }
}

function printHelp() {
  console.log(`
Usage:
  node UploadSourcemaps.js [--dist ./dist] [--release app@1.2.3] [--org ORG] [--project PROJECT]
                           [--url-prefix PREFIX] [--dist-name NAME]
                           [--mode production] [--no-dev-guard] [--no-detect-base] [--dry-run]

Args:
  --dist <path>           Build output directory (default: "dist" or first positional arg).
  --release <name>        Release name. Defaults to $RELEASE or "<VITE_RELEASE_NAME_PREFIX>@$npm_package_version".
  --org <slug>            Override Sentry org (else .sentryclirc).
  --project <slug>        Override Sentry project (else .sentryclirc).
  --url-prefix <prefix>   upload-sourcemaps urlPrefix (e.g., "~/" or "app:///dist").
  --dist-name <name>      Sentry "dist" value (e.g., "darwin-arm64", "win32-x64", "web"). Also read from $DIST.
  --sentry-dist <name>    Alias of --dist-name.
  --mode <name>           Build mode (e.g., production). If omitted, checks $MODE or $NODE_ENV.
  --no-dev-guard          Disable protection that blocks upload when mode != "production".
  --no-detect-base        Do not read Vite "base"; always use "~/" when --url-prefix is not provided.
  --dry-run               Print planned commands instead of executing.
  -h, --help              Show this help.

Notes:
  * Requires SENTRY_AUTH_TOKEN with "project:releases" scope (and "org:read" if you use info commands).
  * urlPrefix defaults:
      - if --url-prefix given → used as is
      - else if detect-base and Vite base starts with "/" → "~/<base>/"
      - else "~/" (safe default for typical Vite web assets)
  * For Electron main/preload with rewrite to app:///, use: --url-prefix "app:///dist" or similar.
`);
}

function parseArgs(argv) {
  const out = {
    dist: undefined, // build dir path
    release: undefined,
    org: undefined,
    project: undefined,
    urlPrefix: undefined,
    distName: undefined, // Sentry dist value
    mode: undefined,
    devGuard: true,
    detectBase: true,
    dryRun: false,
    help: false,
    positional: []
  };
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '-h' || a === '--help') {
      out.help = true;
      continue;
    }
    if (a === '--dry-run') {
      out.dryRun = true;
      continue;
    }
    if (a === '--no-dev-guard') {
      out.devGuard = false;
      continue;
    }
    if (a === '--no-detect-base') {
      out.detectBase = false;
      continue;
    }
    if (a === '--dist') {
      out.dist = args[++i];
      continue;
    }
    if (a === '--release') {
      out.release = args[++i];
      continue;
    }
    if (a === '--org') {
      out.org = args[++i];
      continue;
    }
    if (a === '--project') {
      out.project = args[++i];
      continue;
    }
    if (a === '--url-prefix') {
      out.urlPrefix = args[++i];
      continue;
    }
    if (a === '--mode') {
      out.mode = args[++i];
      continue;
    }
    if (a === '--dist-name' || a === '--sentry-dist') {
      out.distName = args[++i];
      continue;
    }
    if (a.startsWith('--')) {
      console.error(`Unknown option: ${a}`);
      out.help = true;
      continue;
    }
    out.positional.push(a);
  }
  return out;
}

function findViteConfig(cwd) {
  const candidates = ['vite.config.ts', 'vite.config.mts', 'vite.config.js', 'vite.config.mjs', 'vite.config.cjs'];
  for (const name of candidates) {
    const p = resolve(cwd, name);
    if (existsSync(p)) return p;
  }
  return null;
}

function detectViteBase(configPath) {
  try {
    const src = readFileSync(configPath, 'utf8');
    const m = src.match(/base\s*:\s*['"`]([^'"`]+)['"`]/);
    if (m && m[1]) return m[1];
  } catch {
    // ignore
  }
  return null;
}

function ensureMapsExist(distDir) {
  let count = 0;
  const walk = (p) => {
    const st = statSync(p);
    if (st.isDirectory()) {
      for (const f of readdirSync(p)) walk(join(p, f));
    } else if (p.endsWith('.map')) {
      count++;
    }
  };
  if (!existsSync(distDir)) return 0;
  walk(distDir);
  return count;
}

function runSentryCli(args, env, dryRun) {
  const cmd = ['-y', 'sentry-cli', ...args];
  console.log(`$ npx ${cmd.join(' ')}`);
  if (dryRun) return { status: 0 };
  return spawnSync('npx', cmd, { stdio: 'inherit', env });
}

(function main() {
  const argv = parseArgs(process.argv);
  if (argv.help) {
    printHelp();
    process.exit(0);
  }

  const mode = (argv.mode || process.env.MODE || process.env.NODE_ENV || '').toLowerCase();
  loadEnvFromCwd(mode);

  // Resolve build dir (kept as --dist for backward compat)
  const distDir = argv.dist || argv.positional[0] || 'dist';
  const distAbs = resolve(process.cwd(), distDir);

  // Resolve release
  const release =
    argv.release ||
    process.env.RELEASE ||
    (process.env.VITE_RELEASE_NAME_PREFIX && process.env.npm_package_version ? `${process.env.VITE_RELEASE_NAME_PREFIX}@${process.env.npm_package_version}` : undefined);

  if (!release) {
    console.error('ERROR: release is required. Provide --release or set $RELEASE or ensure npm_package_version is present.');
    process.exit(1);
  }

  // Resolve Sentry dist (optional but recommended for multi-platform builds)
  const distName = argv.distName || process.env.DIST || undefined;

  // Dev-guard (default ON)
  if (argv.devGuard) {
    if (!mode.startsWith('production')) {
      console.error(`DEV-GUARD: mode="${mode || '(empty)'}" is not "production". Use --mode production or --no-dev-guard to bypass.`);
      process.exit(2);
    }
    const maps = ensureMapsExist(distAbs);
    if (maps === 0) {
      console.error(`DEV-GUARD: no .map files found under "${distAbs}". Did you build with "build.sourcemap: true"?`);
      process.exit(3);
    }
  }

  // urlPrefix
  let urlPrefix = argv.urlPrefix;
  if (!urlPrefix) {
    if (argv.detectBase) {
      const cfg = findViteConfig(process.cwd());
      const base = cfg ? detectViteBase(cfg) : null;
      if (base && base.startsWith('/')) urlPrefix = `~${base.endsWith('/') ? base : base + '/'}`;
      else urlPrefix = '~/'; // safe fallback
      console.log(`auto-detected urlPrefix from Vite base: ${urlPrefix}`);
    } else {
      urlPrefix = '~/';
    }
  }

  // Env with token
  const env = { ...process.env };
  if (!env.SENTRY_AUTH_TOKEN) {
    console.error('ERROR: SENTRY_AUTH_TOKEN is not set. Put it in your local env (e.g., .env.local).');
    process.exit(4);
  }

  // Info
  console.log(`\nSentry sourcemaps upload
  release    : ${release}
  build dir   : ${distAbs}
  sentry dist : ${distName || '(none)'}
  mode       : ${mode || '(not set)'}
  urlPrefix  : ${urlPrefix}
  org        : ${argv.org || '(from .sentryclirc)'}
  project    : ${argv.project || '(from .sentryclirc)'}
  dev-guard  : ${argv.devGuard}
  dry-run    : ${argv.dryRun}\n`);

  // Build base args with optional org/project overrides
  const baseArgs = [];
  if (argv.org) baseArgs.push('--org', argv.org);
  if (argv.project) baseArgs.push('--project', argv.project);

  // 1) Create/ensure release
  let res = runSentryCli(['releases', 'new', release, ...baseArgs], env, argv.dryRun);
  if (res.status !== 0) process.exit(res.status);

  // 2) Upload sourcemaps (modern command)
  const uploadArgs = ['sourcemaps', 'upload', distAbs, '--release', release, '--url-prefix', urlPrefix, '--ext', 'js', '--ext', 'mjs', '--ext', 'map', '--rewrite', '--validate', ...baseArgs];
  if (distName) uploadArgs.push('--dist', distName);

  res = runSentryCli(uploadArgs, env, argv.dryRun);
  if (res.status !== 0) process.exit(res.status);

  // 3) Finalize release (global to release; dist is per-upload)
  res = runSentryCli(['releases', 'finalize', release, ...baseArgs], env, argv.dryRun);
  if (res.status !== 0) process.exit(res.status);

  console.log('\nDone ✅');
})();
