import { describe, expect, it } from 'vitest';

import { mergeDeep, omitInObjectWithMutation, omitInObjectWithoutMutation } from './ObjectUtils';

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

  describe('mergeDeep', () => {
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
      expect(mergeDeep(origin, { levelA1: { valueA1: false } })).toEqual(expected);
    });

    it('should modify single deep-level value', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, levelA2: { ...origin.levelA1.levelA2, valueA1: false } } };
      expect(mergeDeep(origin, { levelA1: { levelA2: { valueA1: false } } })).toEqual(expected);
    });

    it('should modify multiple top-level values', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, valueA1: false, valueA3: false } };
      expect(mergeDeep(origin, { levelA1: { valueA1: false, valueA3: false } })).toEqual(expected);
    });

    it('should modify multiple deep-level values', () => {
      const expected = { ...origin, levelA1: { ...origin.levelA1, levelA2: { ...origin.levelA1.levelA2, valueA1: false, valueA3: false } } };
      expect(mergeDeep(origin, { levelA1: { levelA2: { valueA1: false, valueA3: false } } })).toEqual(expected);
    });
  });
});
