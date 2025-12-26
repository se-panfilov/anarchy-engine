import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();
const artifactsDir = path.join(repoRoot, '.release-artifacts');

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

function runCapture(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot, ...opts });
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

function npmVersionExists(npmName, version) {
  try {
    // Will exit non-zero if package/version not accessible or doesn't exist
    const v = runCapture('npm', ['view', `${npmName}@${version}`, 'version']);
    return v === version;
  } catch {
    return false;
  }
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function ensureBuildScriptAndDist(wsPathPosix) {
  const pkgJsonPath = path.join(repoRoot, wsPathPosix, 'package.json');
  const pkg = readJson(pkgJsonPath);
  const hasBuild = Boolean(pkg?.scripts?.build);
  if (!hasBuild) {
    throw new Error(`[release] Workspace "${wsPathPosix}" has no scripts.build. Add "build" script to ensure dist is created.`);
  }

  const distPath = path.join(repoRoot, wsPathPosix, 'dist');
  if (!fs.existsSync(distPath)) {
    // not yet built — ok, will be created after build
    return distPath;
  }
  return distPath;
}

function main() {
  const plan = JSON.parse(process.env.RELEASE_PLAN_JSON ?? '{}');
  const dryRun = (process.env.DRY_RUN ?? 'false') === 'true';
  const skipAlreadyPublished = (process.env.RELEASE_SKIP_ALREADY_PUBLISHED ?? 'true') === 'true';

  const releases = plan.releases ?? [];
  if (releases.length === 0) {
    console.log('No releases to do.');
    return;
  }

  if (!fs.existsSync(artifactsDir) && !dryRun) fs.mkdirSync(artifactsDir, { recursive: true });

  // 1) Build + pack artifacts first (so GH release + npm publish share the same tgz)
  const prepared = [];
  for (const r of releases) {
    const tag = `${r.key}@${r.version}`;

    console.log(`\n==> Preparing ${r.key} v${r.version} (${r.path})`);

    // Guard: only anarchy-* packages should be in plan, but keep it safe.
    if (!String(r.path ?? '').startsWith('packages/anarchy-')) {
      console.log(`[skip] Not anarchy package: ${r.path}`);
      continue;
    }

    // Ensure build script exists (and dist expected)
    ensureBuildScriptAndDist(r.path);

    if (dryRun) {
      console.log(`[dry] npm run --workspace ${r.path} build`);
      console.log(`[dry] npm pack --workspace ${r.path} --pack-destination ${artifactsDir}`);
      prepared.push({ ...r, tag, tgzPath: path.join(artifactsDir, `${r.key}-${r.version}.tgz (example)`) });
      continue;
    }

    // Build
    run('npm', ['run', '--workspace', r.path, 'build']);

    // Pack
    // npm pack prints the filename to stdout (e.g. hellpig-anarchy-engine-1.2.3.tgz)
    const tgzName = runCapture('npm', ['pack', '--workspace', r.path, '--pack-destination', artifactsDir]);
    const tgzPath = path.join(artifactsDir, tgzName);

    if (!fs.existsSync(tgzPath)) {
      throw new Error(`[release] npm pack produced "${tgzName}" but file not found at ${tgzPath}`);
    }

    prepared.push({ ...r, tag, tgzPath });
  }

  if (prepared.length === 0) {
    console.log('Nothing to release after filtering.');
    return;
  }

  // 2) Create missing tags (tags are required for GitHub Releases)
  for (const r of prepared) {
    if (hasTag(r.tag)) {
      console.log(`[tag] exists: ${r.tag}`);
      continue;
    }

    if (dryRun) console.log(`[dry] git tag -a ${r.tag} -m "${r.key} v${r.version}"`);
    else run('git', ['tag', '-a', r.tag, '-m', `${r.key} v${r.version}`]);
  }
  if (!dryRun) run('git', ['push', '--tags']);

  // 3) Create GitHub Releases (attach the tgz artifact)
  for (const r of prepared) {
    if (ghReleaseExists(r.tag)) {
      console.log(`[gh] release exists: ${r.tag}`);
      continue;
    }

    const notes = [`**${r.npmName}**`, ``, `- Version: \`${r.prev ?? 'none'}\` → \`${r.version}\``, `- Workspace: \`${r.path}\``, ``, `Artifacts: npm tarball attached (\`.tgz\`).`].join('\n');

    if (dryRun) {
      console.log(`[dry] gh release create ${r.tag} "${r.tgzPath}" --title "${r.key} v${r.version}"`);
    } else {
      run('gh', ['release', 'create', r.tag, r.tgzPath, '--title', `${r.key} v${r.version}`, '--notes', notes]);
    }
  }

  // 4) npm publish tarballs
  for (const r of prepared) {
    const alreadyPublished = npmVersionExists(r.npmName, r.version);

    if (alreadyPublished) {
      const msg = `[npm] already published: ${r.npmName}@${r.version}`;
      if (skipAlreadyPublished) {
        console.log(`${msg} -> skip publish`);
        continue;
      }
      throw new Error(`${msg} (RELEASE_SKIP_ALREADY_PUBLISHED=false)`);
    }

    if (dryRun) {
      console.log(`[dry] npm publish "${r.tgzPath}" --access public`);
    } else {
      run('npm', ['publish', r.tgzPath, '--access', 'public']);
    }
  }

  console.log('\nRelease done.');
}

main();
