import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();

// Does (anarchy-* only):
// - build each package (npm run build --workspace <path>)
// - npm pack each package to a temp dir
// - validate tarball contains dist/
// - create annotated tag key@version (if missing)
// - push tags
// - create GitHub release per tag and attach tarball (if missing)
// - npm publish tarball (Trusted Publishing / OIDC), optionally skip if already published
// supports DRY_RUN=true

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: repoRoot, ...opts });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
}

function runCapture(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot, ...opts });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function safeMkdir(p) {
  fs.mkdirSync(p, { recursive: true });
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

function isAlreadyPublished(npmName, version) {
  // returns true if npm sees that exact version
  try {
    const v = runCapture('npm', ['view', `${npmName}@${version}`, 'version']);
    return v === version;
  } catch {
    // Typically 404 / not found => not published
    return false;
  }
}

function packWorkspace(wsPath, packDir) {
  // npm pack output differs by npm versions; use --json when possible
  // We also use --pack-destination to keep tgz under our control
  const out = runCapture('npm', ['pack', '--workspace', wsPath, '--json', '--pack-destination', packDir]);
  const json = JSON.parse(out);
  // npm pack --json returns an array with objects like { filename, name, version }
  const first = Array.isArray(json) ? json[0] : null;
  const filename = first?.filename;
  if (!filename) throw new Error(`npm pack did not return filename for workspace ${wsPath}`);
  return path.join(packDir, filename);
}

function tarballHasDist(tgzPath) {
  // List tarball contents and check it includes package/dist/
  const listing = runCapture('tar', ['-tzf', tgzPath]);
  const lines = listing
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  return lines.some((p) => p.startsWith('package/dist/'));
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

  // Safety: enforce anarchy-* only
  for (const r of releases) {
    if (!String(r.key ?? '').startsWith('anarchy-')) {
      throw new Error(`Plan contains non-anarchy package: key="${r.key}". This workflow releases only anarchy-*.`);
    }
    if (
      !String(r.path ?? '')
        .replaceAll('\\', '/')
        .startsWith('packages/anarchy-')
    ) {
      throw new Error(`Plan contains path outside packages/anarchy-*: path="${r.path}" for key="${r.key}".`);
    }
  }

  // Pre-check: published?
  const effective = [];
  for (const r of releases) {
    const published = isAlreadyPublished(r.npmName, r.version);
    if (published) {
      const msg = `Already published on npm: ${r.npmName}@${r.version}`;
      if (skipAlready) {
        console.log(`${msg}. Skipping.`);
        continue;
      }
      throw new Error(`${msg}. (set RELEASE_SKIP_ALREADY_PUBLISHED=true to skip)`);
    }
    effective.push(r);
  }

  if (effective.length === 0) {
    console.log('Nothing to release after skipping already published versions.');
    return;
  }

  // Build + pack + validate
  const packRoot = path.join(repoRoot, '.release-packs');
  safeMkdir(packRoot);

  // Map tag -> tarball
  const tarballs = new Map();

  for (const r of effective) {
    const tag = `${r.key}@${r.version}`;
    const wsPath = String(r.path);

    console.log(`\n=== Build: ${r.key} (${wsPath}) ===`);
    if (dryRun) console.log(`[dry] npm run --workspace ${wsPath} build`);
    else run('npm', ['run', '--workspace', wsPath, 'build']);

    const packDir = path.join(packRoot, tag.replaceAll('/', '_'));
    safeMkdir(packDir);

    console.log(`\n=== Pack: ${r.key} -> ${packDir} ===`);
    let tgzPath;
    if (dryRun) {
      tgzPath = path.join(packDir, `${r.key}-${r.version}.tgz`);
      console.log(`[dry] npm pack --workspace ${wsPath} --json --pack-destination ${packDir}`);
      console.log(`[dry] (would validate tarball contains package/dist/)`);
    } else {
      tgzPath = packWorkspace(wsPath, packDir);

      if (!tarballHasDist(tgzPath)) {
        throw new Error(
          [
            `Packed tarball does NOT contain "package/dist/".`,
            `This would likely publish sources instead of build output.`,
            `Fix package publish config (e.g. "files" includes dist, and build outputs go to dist).`,
            `Workspace: ${wsPath}`,
            `Tarball: ${tgzPath}`
          ].join('\n')
        );
      }
    }

    tarballs.set(tag, tgzPath);
  }

  // Tags: key@version
  for (const r of effective) {
    const tag = `${r.key}@${r.version}`;
    if (hasTag(tag)) {
      console.log(`Tag exists: ${tag} (skip)`);
      continue;
    }

    if (dryRun) console.log(`[dry] git tag -a ${tag} -m "${r.key} v${r.version}"`);
    else run('git', ['tag', '-a', tag, '-m', `${r.key} v${r.version}`]);
  }

  if (!dryRun) run('git', ['push', '--tags']);

  // GitHub release (attach tarball)
  for (const r of effective) {
    const tag = `${r.key}@${r.version}`;
    const tgzPath = tarballs.get(tag);

    const notes = [
      `**${r.npmName}**`,
      ``,
      `- Version: \`${r.prev ?? 'none'}\` → \`${r.version}\``,
      `- Workspace: \`${r.path}\``,
      ``,
      `Artifacts:`,
      `- npm package tarball attached to this release`,
      ``,
      `_Source of truth: git tag \`${tag}\`._`
    ].join('\n');

    if (ghReleaseExists(tag)) {
      console.log(`GitHub release exists: ${tag} (skip)`);
      continue;
    }

    if (dryRun) {
      console.log(`[dry] gh release create ${tag} "${tgzPath ?? '<tarball>'}" --title "${r.key} v${r.version}"`);
    } else {
      if (!tgzPath || !fs.existsSync(tgzPath)) {
        throw new Error(`Missing tarball for ${tag}. Expected at: ${tgzPath}`);
      }
      run('gh', ['release', 'create', tag, tgzPath, '--title', `${r.key} v${r.version}`, '--notes', notes]);
    }
  }

  // npm publish (Trusted Publishing / OIDC)
  for (const r of effective) {
    const tag = `${r.key}@${r.version}`;
    const tgzPath = tarballs.get(tag);

    console.log(`\n=== Publish: ${r.npmName}@${r.version} ===`);
    if (dryRun) {
      console.log(`[dry] npm publish "${tgzPath ?? '<tarball>'}" --access public`);
      continue;
    }

    if (!tgzPath || !fs.existsSync(tgzPath)) {
      throw new Error(`Missing tarball for publish ${r.npmName}@${r.version}. Tag=${tag}, tarball=${tgzPath}`);
    }

    run('npm', ['publish', tgzPath, '--access', 'public']);
  }

  console.log('\nRelease done.');
}

main();
