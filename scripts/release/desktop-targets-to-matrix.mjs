const raw = (process.env.DESKTOP_TARGETS ?? '').trim();
const env = (process.env.DESKTOP_ENV ?? 'prod').trim(); // prod | dev | e2e

//Parsing input desktopTargets (string) into matrix.

const allowedPlatforms = new Set(['mac', 'win', 'linux']);
const allowedArch = new Set(['arm64', 'x64', 'universal']);

const allowedArtifact = {
  mac: new Set(['app', 'dmg']),
  win: new Set(['app', 'nsis']),
  linux: new Set(['app', 'appimage'])
};

function runnerOs(platform) {
  if (platform === 'mac') return 'macos-latest';
  if (platform === 'win') return 'windows-latest';
  return 'ubuntu-latest';
}

function err(msg) {
  console.error(msg);
  process.exit(1);
}

if (!raw) {
  console.log(JSON.stringify([]));
  process.exit(0);
}

const parts = raw
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const matrix = [];
for (const p of parts) {
  const [platform, artifact, arch] = p.split(':').map((x) => (x ?? '').trim());

  if (!allowedPlatforms.has(platform)) err(`Invalid platform in "${p}". Allowed: mac|win|linux`);
  if (!allowedArtifact[platform].has(artifact)) err(`Invalid artifact in "${p}". Allowed for ${platform}: ${[...allowedArtifact[platform]].join('|')}`);
  if (!allowedArch.has(arch)) err(`Invalid arch in "${p}". Allowed: arm64|x64|universal`);

  if (arch === 'universal' && platform !== 'mac') err(`"universal" is only valid for mac. Bad target: "${p}"`);

  matrix.push({
    os: runnerOs(platform),
    platform,
    artifact,
    arch,
    env
  });
}

// de-dup
const uniq = [];
const seen = new Set();
for (const m of matrix) {
  const key = `${m.platform}:${m.artifact}:${m.arch}:${m.env}`;
  if (seen.has(key)) continue;
  seen.add(key);
  uniq.push(m);
}

console.log(JSON.stringify(uniq));
