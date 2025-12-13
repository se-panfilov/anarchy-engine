import { describe, expect, it } from 'vitest';

import { filterOutEmptyFieldsRecursive, omitInObjectWithMutation, omitInObjectWithoutMutation, patchObject } from './ObjectUtils';

describe('ObjectUtils', () => {
  describe('omitInObjectWithoutMutation', () => {
    it('should do NOT mutate the original object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      omitInObjectWithoutMutation(obj, ['b']);
      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should remove a property from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b'> = omitInObjectWithoutMutation(obj, ['b']);

      expect(result).toEqual(expectedResult);
      expect(obj).not.toEqual(result);
    });

    it('should remove multiple properties from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b' | 'd' | 'e'> = omitInObjectWithoutMutation(obj, ['b', 'd', 'e']);

      expect(result).toEqual(expectedResult);
      expect(obj).not.toEqual(result);
    });
  });

  describe('omitInObjectWithMutation', () => {
    it('should do mutate the original object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      omitInObjectWithMutation(obj, ['b']);
      expect(obj).toEqual({ a: 1, c: 3 });
    });

    it('should remove a property from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b'> = omitInObjectWithMutation(obj, ['b']);

      expect(result).toEqual(expectedResult);
      expect(obj).toEqual(result);
    });

    it('should remove multiple properties from an object', () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      const expectedResult: Record<string, number> = { a: 1, c: 3 };
      const result: Omit<typeof obj, 'b' | 'd' | 'e'> = omitInObjectWithMutation(obj, ['b', 'd', 'e']);

      expect(result).toEqual(expectedResult);
      expect(obj).toEqual(result);
    });
  });

  describe('patchObject', () => {
    const origin = {
      levelA1: {
        valueA1: true,
        valueA2: true,
        valueA3: true,
        levelA2: {
          valueA1: true,
          valueA2: true,
          valueA3: true
        }
      },
      levelB1: {
        valueB1: true,
        valueB2: true,
        valueB3: true,
        levelB2: {
          valueB1: true,
          valueB2: true,
          valueB3: true
        }
      },
      levelC1: {
        valueC1: true,
        valueC2: true,
        valueC3: true,
        levelC2: {
          valueC1: true,
          valueC2: true,
          valueC3: true
        }
      }
    };

    it('should modify single top-level value', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, valueA1: false } };
      expect(patchObject(origin, { levelA1: { valueA1: false } })).toEqual(expected);
    });

    it('should modify single deep-level value', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, levelA2: { ...origin.levelA1.levelA2, valueA1: false } } };
      expect(patchObject(origin, { levelA1: { levelA2: { valueA1: false } } })).toEqual(expected);
    });

    it('should modify multiple top-level values', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, valueA1: false, valueA3: false } };
      expect(patchObject(origin, { levelA1: { valueA1: false, valueA3: false } })).toEqual(expected);
    });

    it('should modify multiple deep-level values', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, levelA2: { ...origin.levelA1.levelA2, valueA1: false, valueA3: false } } };
      expect(patchObject(origin, { levelA1: { levelA2: { valueA1: false, valueA3: false } } })).toEqual(expected);
    });
  });

  describe('filterOutEmptyFieldsRecursive', () => {
    it('should remove "undefined" keys from plain object (shallow)', () => {
      const src: Record<string, any> = { a: 1, b: undefined, c: 3, d: undefined };
      const out: Record<string, any> = filterOutEmptyFieldsRecursive(src);
      expect(out).toEqual({ a: 1, c: 3 });
    });

    it('should remove undefined keys deeply (nested objects)', () => {
      const src: Record<string, any> = { a: { x: 1, y: undefined }, b: { c: { d: undefined, e: 2, g: undefined } }, f: undefined };
      const out: Record<string, any> = filterOutEmptyFieldsRecursive(src);
      expect(out).toEqual({ a: { x: 1 }, b: { c: { e: 2 } } });
    });

    it('should remove undefined elements from arrays by default', () => {
      const src: Record<string, any> = { arr: [1, undefined, 3, undefined] };
      const out: Record<string, any> = filterOutEmptyFieldsRecursive(src);
      expect(out).toEqual({ arr: [1, 3] });
    });

    it('should remove undefined inside nested arrays and objects', () => {
      const src: Record<string, any> = { arr: [1, { x: undefined, y: 2 }, [undefined, 4, undefined, undefined], []] };
      const out: Record<string, any> = filterOutEmptyFieldsRecursive(src);
      expect(out).toEqual({ arr: [1, { y: 2 }, [4], []] });
    });

    it('should  not mutate the original input', () => {
      const src: Record<string, any> = { a: 1, b: { c: undefined } };
      const snapshot: string = JSON.stringify(src);
      void filterOutEmptyFieldsRecursive(src);
      expect(JSON.stringify(src)).toBe(snapshot);
    });

    it('should preserves Date instances (value equality)', () => {
      const d = new Date('2020-01-01T00:00:00.000Z');
      const out = filterOutEmptyFieldsRecursive({ d, u: undefined }) as { d: Date };
      expect(out.d instanceof Date).toBe(true);
    });

    it('should preserves RegExp instances', () => {
      const r = /test/gi;
      const out = filterOutEmptyFieldsRecursive({ r, u: undefined }) as { r: RegExp };
      expect(out.r instanceof RegExp).toBe(true);
    });

    it('should preserves Map instances (structure)', () => {
      const m = new Map<string, any>([
        ['k1', 1],
        ['k2', undefined]
      ]);
      const out = filterOutEmptyFieldsRecursive({ m }) as { m: Map<string, any> };
      expect(out.m instanceof Map).toBe(true);
    });

    it('should preserves Set instances (structure)', () => {
      const s = new Set<any>([1, undefined, 3]);
      const out = filterOutEmptyFieldsRecursive({ s }) as { s: Set<any> };
      expect(out.s instanceof Set).toBe(true);
    });

    it('should preserves TypedArray instances', () => {
      const ta = new Uint8Array([1, 2, 3]);
      const out = filterOutEmptyFieldsRecursive({ ta }) as { ta: Uint8Array };
      expect(out.ta instanceof Uint8Array).toBe(true);
    });

    it('should keep class instances (prototype intact)', () => {
      class Foo {
        x = 1;
        getX() {
          return this.x;
        }
      }
      const foo = new Foo();
      const out = filterOutEmptyFieldsRecursive({ foo }) as { foo: Foo };
      expect(out.foo instanceof Foo).toBe(true);
    });

    it('should handles root-level undefined by returning undefined', () => {
      const out = filterOutEmptyFieldsRecursive(undefined as unknown as any);
      expect(out).toBeUndefined();
    });

    it('should return empty object if all keys were undefined', () => {
      const out = filterOutEmptyFieldsRecursive({ a: undefined, b: undefined });
      expect(out).toEqual({});
    });

    it('should handle empty arrays', () => {
      const out = filterOutEmptyFieldsRecursive({ arr: [] });
      expect(out).toEqual({ arr: [] });
    });
  });
});
