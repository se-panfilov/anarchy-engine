import { DefaultBannedInJsonKeys } from '@Anarchy/Shared/Constants';
import { describe, expect, it } from 'vitest';

import { validateJson } from './SanitizeUtils';

describe('validateJson', () => {
  it('should parse valid JSON', () => {
    const result: Record<string, number> = validateJson<{ a: number }>('{"a":1}');
    expect(result.a).toBe(1);
  });

  it('should fail on empty input', () => {
    expect(() => validateJson('')).toThrow();
  });

  it('should fail when size exceeds maxBytes', () => {
    const raw = '{"a":' + 'x'.repeat(1024 * 1024) + '}';
    expect(() => validateJson(raw, DefaultBannedInJsonKeys, { maxBytes: 10 })).toThrow();
  });

  it('should fail on BOM at start', () => {
    const bom = '\uFEFF{"a":1}';
    expect(() => validateJson(bom)).toThrow();
  });

  it('should fail on raw control inside string', () => {
    const raw = '{"s":"hi\u000B"}'; // VT must be escaped
    expect(() => validateJson(raw)).toThrow();
  });

  it('should fail on disallowed control outside string', () => {
    const raw = '{\u0001"a":1}';
    expect(() => validateJson(raw)).toThrow();
  });

  it('should fail on U+2028 outside string', () => {
    const raw = '{\u2028"a":1}';
    expect(() => validateJson(raw)).toThrow();
  });

  it('should fail on dangerous key by default', () => {
    const raw = '{"__proto__":{"x":1}}';
    expect(() => validateJson(raw)).toThrow();
  });

  it('should fail when custom dangerousKeys contains a present key', () => {
    const raw = '{"safe":1,"toString":2}';
    expect(() => validateJson(raw, ['safe'])).toThrow(/Dangerous key "safe"/);
  });

  it('should fail on excessive depth', () => {
    const raw = JSON.stringify({ a: { b: { c: 1 } } });
    expect(() => validateJson(raw, DefaultBannedInJsonKeys, { maxDepth: 2 })).toThrow();
  });
});
