export function parseDistName(distName: string | undefined | null): Readonly<{ platform: string; arch: string }> {
  if (!distName) return { platform: 'unknown', arch: 'unknown' };

  const parts: ReadonlyArray<string> = distName.toLowerCase().trim().split('-');
  const [platform, arch] = parts;
  return { platform: platform || 'unknown', arch: arch || 'unknown' };
}
