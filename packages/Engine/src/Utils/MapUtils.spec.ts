import { findInMap } from './MapUtils';

describe('MapUtils', () => {
  const map: Map<string, number> = new Map<string, number>();
  map.set('a', 1);
  map.set('b', 2);
  map.set('c', 3);

  describe('findInMap', () => {
    it('should return a value', () => {
      expect(findInMap(map, (v: number): boolean => v === 2)).toEqual(2);
    });

    it('should return nothing if an empty map', () => {
      expect(findInMap(new Map(), (v: number): boolean => v === 2)).toBeUndefined();
    });

    it('should return nothing if condition do not match', () => {
      expect(findInMap(new Map(), (v: number): boolean => v === 2222)).toBeUndefined();
    });
  });
});
