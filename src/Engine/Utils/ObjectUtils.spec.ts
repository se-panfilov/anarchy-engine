import { isObjectsEqual, omitInObjectWithMutation, omitInObjectWithoutMutation } from './ObjectUtils';

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

  describe('isObjectsEqual', () => {
    it('should return "true" for two empty objects', () => {
      const obj1 = {};
      const obj2 = {};
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return "true" for two objects with the same properties and values', () => {
      const obj1 = { a: 1, b: 2, c: 3 };
      const obj2 = { a: 1, b: 2, c: 3 };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return "false" for two objects with different properties', () => {
      const obj1 = { a: 1, b: 2, c: 3 };
      const obj2 = { a: 1, b: 2, d: 4 };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });

    it('should return "false" for two objects with the same properties but different values', () => {
      const obj1 = { a: 1, b: 2, c: 3 };
      const obj2 = { a: 1, b: 2, c: 4 };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });

    it('should return "true" for two objects with properties in different order', () => {
      const obj1 = { a: 1, b: 2, c: 3 };
      const obj2 = { c: 3, b: 2, a: 1 };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return "false" for objects with nested properties that has different values', () => {
      const obj1 = { a: 1, b: { x: 10, y: 20 } };
      const obj2 = { a: 1, b: { x: 10, y: 30 } };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });

    it('should return "false" for objects with nested properties that are different', () => {
      const obj1 = { a: 1, b: { x: 10, y: 20 } };
      const obj2 = { a: 1, b: { x: 10, z: 30 } };
      expect(isObjectsEqual(obj1, obj2)).toBe(false);
    });

    it('should return "true" for objects with nested properties that are the same', () => {
      const obj1 = { a: 1, b: { x: 10, y: 20 } };
      const obj2 = { a: 1, b: { x: 10, y: 20 } };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });

    it('should return "true" for objects with nested properties that are the same but different order', () => {
      const obj1 = { a: 1, b: { x: 10, y: 20 } };
      const obj2 = { a: 1, b: { y: 20, x: 10 } };
      expect(isObjectsEqual(obj1, obj2)).toBe(true);
    });
  });
});
