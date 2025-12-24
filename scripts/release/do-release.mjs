import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();

// Does (anarchy-* only):
// - create annotated tags: key@version
// - push tags
// - npm publish for each planned release (Trusted Publishing / OIDC)
// supports DRY_RUN=true
//
// Behavior for "already published":
// - if npm already contains npmName@version -> skip by default (RELEASE_SKIP_ALREADY_PUBLISHED=true)

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: repoRoot, ...opts });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
}

function runCapture(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function runCaptureSoft(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot });
  return {
    status: r.status ?? 1,
    stdout: (r.stdout ?? '').trim(),
    stderr: (r.stderr ?? '').trim()
  };
}

function hasTag(tag) {
  return runCapture('git', ['tag', '--list', tag]) === tag;
}

function npmVersionExists(pkgName, version) {
  // public-friendly check
  const query = `${pkgName}@${version}`;
  const r = runCaptureSoft('npm', ['view', query, 'version']);
  if (r.status === 0) return r.stdout.includes(version);
  return false;
}

function main() {
  const plan = JSON.parse(process.env.RELEASE_PLAN_JSON ?? '{}');
  const dryRun = (process.env.DRY_RUN ?? 'false') === 'true';
  const skipAlready = (process.env.RELEASE_SKIP_ALREADY_PUBLISHED ?? 'true') === 'true';

  const releases = plan.releases ?? [];
  if (releases.length === 0) {
    console.log('No releases to do.');
    return;
  }

  // Extra safety: allow only packages/anarchy-* paths
  const eligible = releases.filter((r) => typeof r?.path === 'string' && r.path.startsWith('packages/anarchy-'));
  if (eligible.length === 0) {
    console.log('No eligible anarchy-* releases to do.');
    return;
  }

  // Make sure tags list is up to date
  if (!dryRun) {
    run('git', ['fetch', '--tags', '--force']);
  }

  // Tags: key@version
  for (const r of eligible) {
    const tag = `${r.key}@${r.version}`;
    if (hasTag(tag)) continue;

    if (dryRun) {
      console.log(`[dry] git tag -a ${tag} -m "${r.key} v${r.version}"`);
    } else {
      run('git', ['tag', '-a', tag, '-m', `${r.key} v${r.version}`]);
    }
  }

  if (!dryRun) run('git', ['push', '--tags']);

  // npm publish (Trusted Publishing / OIDC)
  for (const r of eligible) {
    const already = npmVersionExists(r.npmName, r.version);
    if (already) {
      const msg = `npm already has ${r.npmName}@${r.version} → skip`;
      if (skipAlready) {
        console.log(msg);
        continue;
      }
      throw new Error(msg);
    }

    if (dryRun) {
      console.log(`[dry] npm publish --workspace ${r.path} --access public`);
    } else {
      run('npm', ['publish', '--workspace', r.path, '--access', 'public']);
    }
  }

  console.log('Release done.');
}

main();
