import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import semver from 'semver';

const repoRoot = process.cwd();

//Calculates "what to release" based on tags name@x.y.z and current package.json.

function runCapture(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function listWorkspaces() {
  const out = [];
  for (const base of ['apps', 'packages']) {
    const baseDir = path.join(repoRoot, base);
    if (!fs.existsSync(baseDir)) continue;

    for (const ent of fs.readdirSync(baseDir, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;

      const wsPath = path.join(base, ent.name);
      const pkgPath = path.join(wsPath, 'package.json');
      if (!fs.existsSync(pkgPath)) continue;

      const pkg = readJson(pkgPath);
      if (!pkg?.name || !pkg?.version) continue;

      const wsPathNorm = wsPath.replaceAll('\\', '/');

      out.push({
        path: wsPathNorm,
        name: String(pkg.name),
        version: String(pkg.version),
        private: pkg.private === true,
        isAnarchy: wsPathNorm.startsWith('packages/anarchy-'),
        isDesktop: wsPathNorm === 'apps/showcases-desktop'
      });
    }
  }
  return out;
}

function latestTagVersionFor(name) {
  const tags = runCapture('git', ['tag', '--list', `${name}@*`])
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  let best = null;
  for (const t of tags) {
    const v = t.slice((name + '@').length);
    if (!semver.valid(v)) continue;
    if (!best || semver.gt(v, best)) best = v;
  }
  return best; // string | null
}

function main() {
  const mode = (process.env.RELEASE_MODE ?? 'all').trim(); // all | one
  const target = (process.env.RELEASE_WORKSPACE ?? '').trim();

  if (mode !== 'all' && mode !== 'one') {
    throw new Error(`Invalid RELEASE_MODE: ${mode}. Allowed: all|one`);
  }
  if (mode === 'one' && !target) {
    throw new Error(`mode=one requires RELEASE_WORKSPACE (workspace name)`);
  }

  const workspaces = listWorkspaces();
  const selected = mode === 'one' ? workspaces.filter((w) => w.name === target) : workspaces;

  if (mode === 'one' && selected.length === 0) {
    const names = workspaces.map((w) => w.name).sort();
    throw new Error(`Workspace not found by name: "${target}". Available:\n- ${names.join('\n- ')}`);
  }

  const releases = [];
  for (const w of selected) {
    const last = latestTagVersionFor(w.name);
    const shouldRelease = !last || semver.neq(w.version, last);
    if (!shouldRelease) continue;

    releases.push({
      name: w.name,
      path: w.path,
      version: w.version,
      prev: last ?? null,
      private: w.private,
      isAnarchy: w.isAnarchy,
      isDesktop: w.isDesktop
    });
  }

  releases.sort((a, b) => a.name.localeCompare(b.name));
  console.log(JSON.stringify({ releases }, null, 2));
}

main();
