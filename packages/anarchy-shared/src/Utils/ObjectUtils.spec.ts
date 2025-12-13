import { describe, expect, it } from 'vitest';

import { omitInObjectWithMutation, omitInObjectWithoutMutation } from './ObjectUtils';

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
});
