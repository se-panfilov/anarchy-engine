import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const KNOWN_INSTALLERS = new Set([
  // generic archives
  'dir',
  'zip',
  '7z',
  'tar.gz',
  'tar.xz',
  // macOS
  'dmg',
  'pkg',
  // Windows
  'nsis',
  'portable',
  'msi',
  'msix',
  // Linux
  'appimage',
  'deb',
  'rpm',
  'snap',
  'pacman',
  'apk'
]);

function normalizeInstallerToken(token) {
  if (!token) return null;
  const t = String(token).trim();
  if (!t) return null;
  const lower = t.toLowerCase();
  if (KNOWN_INSTALLERS.has(lower)) return lower;
  return null;
}

export function parseInstallersFromCli(cliArgs = [], { envDir = false } = {}) {
  const explicitTokens = cliArgs.filter((a) => !a.startsWith('-'));
  const hasDirFlag = cliArgs.includes('--dir');

  const installers = [];
  for (const tok of explicitTokens) {
    const norm = normalizeInstallerToken(tok);
    if (norm) installers.push(norm);
  }

  if (hasDirFlag || envDir) installers.push('dir');
  if (cliArgs.includes('--portable')) installers.push('portable');

  const seen = new Set();
  const dedup = installers.filter((x) => {
    if (seen.has(x)) return false;
    seen.add(x);
    return true;
  });

  return {
    installers: dedup,
    hasDirTokenInCli: hasDirFlag || explicitTokens.includes('dir')
  };
}

export function writeDistInfo({ mode, platforms, archs, installers = [], outDir } = {}) {
  if (!Array.isArray(platforms) || platforms.length === 0) throw new Error('writeDistInfo: platforms[] is required');
  if (!Array.isArray(archs) || archs.length === 0) throw new Error('writeDistInfo: archs[] is required');

  const out = outDir || path.resolve(process.cwd(), 'dist');
  mkdirSync(out, { recursive: true });

  const primaryPlatform = platforms[0];
  const primaryArch = archs[0];
  const distName = `${primaryPlatform}-${primaryArch}`;

  const normInstallers = installers.map((t) => normalizeInstallerToken(t) || (t === 'dir' ? 'dir' : null)).filter(Boolean);

  const info = {
    mode,
    platforms,
    archs,
    installers: Array.from(new Set(normInstallers)),
    platform: primaryPlatform,
    arch: primaryArch,
    distName
  };

  const infoPath = path.join(out, 'dist-info.json');
  writeFileSync(infoPath, JSON.stringify(info, null, 2));
  return { path: infoPath, info };
}

export { KNOWN_INSTALLERS };
