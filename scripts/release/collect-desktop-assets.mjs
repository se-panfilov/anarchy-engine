import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'apps', 'showcases-desktop', 'dist');

const allowedExt = new Set(['.dmg', '.zip', '.7z', '.tar', '.gz', '.exe', '.msi', '.appimage', '.deb', '.rpm', '.yml', '.yaml', '.blockmap', '.sig']);

//Builds "distributable" assets from apps/showcases-desktop/dist/** recursively (without knowing exact paths).

function walk(dir, out) {
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile()) out.push(p);
  }
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error(`dist directory not found: ${distDir}`);
    process.exit(1);
  }

  const files = [];
  walk(distDir, files);

  const assets = files.filter((p) => {
    const lower = p.toLowerCase();
    const ext = path.extname(lower);
    return allowedExt.has(ext) || lower.endsWith('.appimage');
  });

  if (assets.length === 0) {
    console.error(`No distributable assets found under ${distDir}.`);
    process.exit(1);
  }

  for (const a of assets) console.log(a);
}

main();
