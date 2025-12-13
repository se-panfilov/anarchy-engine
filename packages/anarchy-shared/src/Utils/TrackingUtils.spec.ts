import { describe, expect, it } from 'vitest';

import { parseDistName } from './TrackingUtils';

describe('TrackingUtils', () => {
  it('should parse valid formats', () => {
    expect(parseDistName('win32-x64')).toEqual({ platform: 'win32', arch: 'x64' });
    expect(parseDistName('linux-arm64')).toEqual({ platform: 'linux', arch: 'arm64' });
    expect(parseDistName('darwin-arm64')).toEqual({ platform: 'darwin', arch: 'arm64' });
  });

  it('should work with invalid formats', () => {
    expect(parseDistName('')).toEqual({ platform: 'unknown', arch: 'unknown' });
    expect(parseDistName('web')).toEqual({ platform: 'web', arch: 'unknown' });
  });

  it('should work with no value', () => {
    expect(parseDistName(undefined)).toEqual({ platform: 'unknown', arch: 'unknown' });
    expect(parseDistName(null)).toEqual({ platform: 'unknown', arch: 'unknown' });
  });

  it('should handle edge cases', () => {
    expect(parseDistName('win32-')).toEqual({ platform: 'win32', arch: 'unknown' });
    expect(parseDistName('-x64')).toEqual({ platform: 'unknown', arch: 'x64' });
    expect(parseDistName('win32-x64-extra')).toEqual({ platform: 'win32', arch: 'x64' });
  });
});
