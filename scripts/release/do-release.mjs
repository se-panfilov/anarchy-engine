import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();

//Does:
// tags for all releases from the plan
// GitHub Releases only for anarchy-* and showcases-desktop
// npm publish only for anarchy-*
// supports DRY_RUN=true

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: repoRoot, ...opts });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
}

function runCapture(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function hasTag(tag) {
  return runCapture('git', ['tag', '--list', tag]) === tag;
}

function ghReleaseExists(tag) {
  try {
    runCapture('gh', ['release', 'view', tag]);
    return true;
  } catch {
    return false;
  }
}

function main() {
  const plan = JSON.parse(process.env.RELEASE_PLAN_JSON ?? '{}');
  const dryRun = (process.env.DRY_RUN ?? 'false') === 'true';

  const releases = plan.releases ?? [];
  if (releases.length === 0) {
    console.log('No releases to do.');
    return;
  }

  // Tags: key@version
  for (const r of releases) {
    const tag = `${r.key}@${r.version}`;
    if (hasTag(tag)) continue;

    if (dryRun) console.log(`[dry] git tag -a ${tag} -m "${r.key} v${r.version}"`);
    else run('git', ['tag', '-a', tag, '-m', `${r.key} v${r.version}`]);
  }
  if (!dryRun) run('git', ['push', '--tags']);

  // GitHub Releases: only anarchy-* and showcases-desktop
  for (const r of releases) {
    const shouldCreateGhRelease = r.isAnarchy || r.isDesktop;
    if (!shouldCreateGhRelease) continue;

    const tag = `${r.key}@${r.version}`;
    if (ghReleaseExists(tag)) continue;

    const notes = [
      `**${r.npmName}**`,
      ``,
      `- Version: \`${r.prev ?? 'none'}\` → \`${r.version}\``,
      `- Workspace: \`${r.path}\``,
      ``,
      `_Manual release (button-driven)._`
    ].join('\n');

    if (dryRun) console.log(`[dry] gh release create ${tag} --title "${r.key} v${r.version}"`);
    else run('gh', ['release', 'create', tag, '--title', `${r.key} v${r.version}`, '--notes', notes]);
  }

  // npm publish only packages/anarchy-*
  for (const r of releases) {
    if (!r.isAnarchy) continue;
    if (r.private) continue;

    if (dryRun) {
      console.log(`[dry] npm publish --workspace ${r.path} --access public`);
    } else {
      run('npm', ['publish', '--workspace', r.path, '--access', 'public']);
    }
  }

  console.log('Release done.');
}

main();
