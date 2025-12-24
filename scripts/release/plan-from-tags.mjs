import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import semver from 'semver';

const repoRoot = process.cwd();

// Calculates "what to release" based on tags key@x.y.z and current package.json.
// Scope: ONLY packages/anarchy-*
// (showcases-* and other apps/packages are ignored completely)

function runCapture(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function listAnarchyWorkspaces() {
  const out = [];
  const baseDir = path.join(repoRoot, 'packages');
  if (!fs.existsSync(baseDir)) return out;

  for (const ent of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;

    const wsKey = ent.name; // folder name, e.g. anarchy-engine
    if (!wsKey.startsWith('anarchy-')) continue;

    const wsPath = path.join('packages', ent.name);
    const pkgPath = path.join(repoRoot, wsPath, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;

    const pkg = readJson(pkgPath);
    if (!pkg?.version) continue;

    const wsPathNorm = wsPath.replaceAll('\\', '/');

    out.push({
      key: wsKey,
      path: wsPathNorm,
      npmName: String(pkg.name ?? wsKey),
      version: String(pkg.version),
      private: pkg.private === true
    });
  }

  return out;
}

function latestTagVersionFor(wsKey) {
  const tags = runCapture('git', ['tag', '--list', `${wsKey}@*`])
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  let best = null;
  for (const t of tags) {
    const v = t.slice((wsKey + '@').length);
    if (!semver.valid(v)) continue;
    if (!best || semver.gt(v, best)) best = v;
  }
  return best;
}

function main() {
  const mode = (process.env.RELEASE_MODE ?? 'all').trim(); // all | one
  const targetKey = (process.env.RELEASE_WORKSPACE ?? '').trim();

  if (mode !== 'all' && mode !== 'one') throw new Error(`Invalid RELEASE_MODE: ${mode}`);
  if (mode === 'one' && !targetKey) throw new Error(`mode=one requires RELEASE_WORKSPACE (workspace key)`);

  const workspaces = listAnarchyWorkspaces().filter((w) => !w.private);
  const selected = mode === 'one' ? workspaces.filter((w) => w.key === targetKey) : workspaces;

  if (mode === 'one' && selected.length === 0) {
    const keys = workspaces.map((w) => w.key).sort();
    throw new Error(`Workspace key not found or not eligible: "${targetKey}". Available:\n- ${keys.join('\n- ')}`);
  }

  const releases = [];
  for (const w of selected) {
    const last = latestTagVersionFor(w.key);
    const shouldRelease = !last || semver.neq(w.version, last);
    if (!shouldRelease) continue;

    releases.push({
      key: w.key,
      npmName: w.npmName,
      path: w.path,
      version: w.version,
      prev: last ?? null,
      private: w.private
    });
  }

  releases.sort((a, b) => a.key.localeCompare(b.key));
  console.log(JSON.stringify({ releases }, null, 2));
}

main();
