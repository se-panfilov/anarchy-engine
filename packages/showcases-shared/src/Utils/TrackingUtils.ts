import type { TDistName, TReleaseName } from '@Showcases/Shared/Models';

export const makeReleaseName = (prefix: string, version: string): TReleaseName => `${prefix}@${version}`;

export const makeDistName = (platform: string, arch: string): TDistName => `${platform}-${arch}`;
