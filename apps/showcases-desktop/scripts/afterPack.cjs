const fs = require('node:fs');
const path = require('node:path');

// Adds a Sentry dist marker (distName) file to the build output directory
module.exports = async function afterPack(context) {
  const platform = context.electronPlatformName; // 'darwin' | 'win32' | 'linux'
  const arch = archToString(context.arch); // 'x64' | 'arm64' | 'ia32' | 'universal' | etc.
  const distName = `${platform}-${arch}`;

  console.log('[AFTER PACK] for dist name', distName);

  const projectDir = context.packager.info.projectDir;
  const candidates = [path.resolve(projectDir, 'apps/showcases-desktop/dist'), path.resolve(projectDir, 'apps/showcases-desktop/dist/dist-desktop')];

  for (const dir of candidates) {
    if (!fs.existsSync(dir)) continue;
    try {
      fs.writeFileSync(path.join(dir, '.sentry-dist'), `${distName}\n`, 'utf8');
      console.log('[AFTER PACK] wrote .sentry-dist →', distName, 'in', dir);
    } catch (e) {
      console.warn('[AFTER PACK] WARN write failed in', dir, e);
    }
  }
};

function archToString(arch) {
  // electron-builder Arch enum mapping
  const map = { 0: 'ia32', 1: 'x64', 2: 'armv7l', 3: 'arm64', 4: 'universal' };
  return map[arch] || String(arch);
}
