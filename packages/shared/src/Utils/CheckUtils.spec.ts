import { describe, expect, it } from 'vitest';

import { isAllDefined, isAllNotDefined, isBoolean, isDefined, isNotDefined, isString } from './CheckUtils';

describe('CheckUtils', () => {
  describe('isDefined', () => {
    it('should return "true" if value is "string"', () => {
      expect(isDefined('value')).toBe(true);
    });

    it('should return "true" if value is an empty"string"', () => {
      expect(isDefined('')).toBe(true);
    });

    it('should return "true" if value is "number"', () => {
      expect(isDefined(10)).toBe(true);
    });

    it('should return "true" if value is "0"', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('0')).toBe(true);
    });

    it('should return "true" if value is an "object"', () => {
      expect(isDefined({ a: 'some' })).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    it('should return "true" if value is an "array"', () => {
      expect(isDefined(['some'])).toBe(true);
      expect(isDefined([])).toBe(true);
    });

    it('should return "true" if value is a "Map"', () => {
      expect(isDefined(new Map())).toBe(true);
      expect(isDefined(new Map().set('a', 'b'))).toBe(true);
    });

    it('should return "true" if value is a "Set"', () => {
      expect(isDefined(new Set())).toBe(true);
      expect(isDefined(new Set([1, 2, 3]))).toBe(true);
    });

    it('should return "true" if value is invalid number', () => {
      expect(isDefined(NaN)).toBe(true);
      expect(isDefined(Infinity)).toBe(true);
      expect(isDefined(-Infinity)).toBe(true);
    });

    it('should return "false" if value is "undefined"', () => {
      expect(isDefined(undefined)).toBe(false);
    });

    it('should return "false" if value is "null"', () => {
      expect(isDefined(null)).toBe(false);
    });
  });

  describe('isAllDefined', () => {
    it('should return "true" if value is "string"', () => {
      expect(isAllDefined(['value'])).toBe(true);
      expect(isAllDefined(['value', 'some_value'])).toBe(true);
    });

    it('should return "true" if value is an empty"string"', () => {
      expect(isAllDefined([''])).toBe(true);
      expect(isAllDefined(['', ''])).toBe(true);
    });

    it('should return "true" if value is "number"', () => {
      expect(isAllDefined([10])).toBe(true);
      expect(isAllDefined([10, 20])).toBe(true);
    });

    it('should return "true" if value is "0"', () => {
      expect(isAllDefined([0])).toBe(true);
      expect(isAllDefined([0, 0])).toBe(true);
      expect(isAllDefined(['0'])).toBe(true);
      expect(isAllDefined(['0', '0'])).toBe(true);
    });

    it('should return "true" if value is an "object"', () => {
      expect(isAllDefined([{ a: 'some' }])).toBe(true);
      expect(isAllDefined([{ a: 'some' }, { b: 'other' }])).toBe(true);
      expect(isAllDefined([{}])).toBe(true);
      expect(isAllDefined([{}, {}])).toBe(true);
    });

    it('should return "true" if value is an "array" of arrays', () => {
      expect(isAllDefined([['some']])).toBe(true);
      expect(isAllDefined([['some'], ['some']])).toBe(true);
      expect(isAllDefined([[]])).toBe(true);
      expect(isAllDefined([[], []])).toBe(true);
    });

    it('should return "true" if value is a "Map"', () => {
      expect(isAllDefined([new Map()])).toBe(true);
      expect(isAllDefined([new Map(), new Map()])).toBe(true);
      expect(isAllDefined([new Map().set('a', 'b')])).toBe(true);
      expect(isAllDefined([new Map().set('a', 'b'), new Map().set('c', 'd')])).toBe(true);
    });

    it('should return "true" if value is a "Set"', () => {
      expect(isAllDefined([new Set()])).toBe(true);
      expect(isAllDefined([new Set(), new Set()])).toBe(true);
      expect(isAllDefined([new Set([1, 2, 3])])).toBe(true);
      expect(isAllDefined([new Set([1, 2, 3]), new Set([4, 5, 6])])).toBe(true);
    });

    it('should return "true" if value is invalid number', () => {
      expect(isAllDefined([NaN])).toBe(true);
      expect(isAllDefined([NaN, NaN])).toBe(true);
      expect(isAllDefined([Infinity])).toBe(true);
      expect(isAllDefined([Infinity, Infinity])).toBe(true);
      expect(isAllDefined([-Infinity])).toBe(true);
      expect(isAllDefined([-Infinity, -Infinity])).toBe(true);
    });

    it('should return "false" if value is "undefined"', () => {
      expect(isAllDefined([undefined])).toBe(false);
      expect(isAllDefined([undefined, undefined])).toBe(false);
    });

    it('should return "false" if value is "null"', () => {
      expect(isAllDefined([null])).toBe(false);
      expect(isAllDefined([null, null])).toBe(false);
    });

    it('should return "false" if at least one value is not defined', () => {
      expect(isAllDefined([1, undefined])).toBe(false);
      expect(isAllDefined([undefined, '2', undefined])).toBe(false);
      expect(isAllDefined([1, '2', undefined, 4])).toBe(false);
    });
  });

  describe('isNotDefined', () => {
    it('should return "false" if value is "string"', () => {
      expect(isNotDefined('value')).toBe(false);
    });

    it('should return "false" if value is an empty"string"', () => {
      expect(isNotDefined('')).toBe(false);
    });

    it('should return "false" if value is "number"', () => {
      expect(isNotDefined(10)).toBe(false);
    });

    it('should return "false" if value is "0"', () => {
      expect(isNotDefined(0)).toBe(false);
      expect(isNotDefined('0')).toBe(false);
    });

    it('should return "false" if value is an "object"', () => {
      expect(isNotDefined({ a: 'some' })).toBe(false);
      expect(isNotDefined({})).toBe(false);
    });

    it('should return "false" if value is an "array"', () => {
      expect(isNotDefined(['some'])).toBe(false);
      expect(isNotDefined([])).toBe(false);
    });

    it('should return "false" if value is a "Map"', () => {
      expect(isNotDefined(new Map())).toBe(false);
      expect(isNotDefined(new Map().set('a', 'b'))).toBe(false);
    });

    it('should return "false" if value is a "Set"', () => {
      expect(isNotDefined(new Set())).toBe(false);
      expect(isNotDefined(new Set([1, 2, 3]))).toBe(false);
    });

    it('should return "false" if value is invalid number', () => {
      expect(isNotDefined(NaN)).toBe(false);
      expect(isNotDefined(Infinity)).toBe(false);
      expect(isNotDefined(-Infinity)).toBe(false);
    });

    it('should return "true" if value is "undefined"', () => {
      expect(isNotDefined(undefined)).toBe(true);
    });

    it('should return "true" if value is "null"', () => {
      expect(isNotDefined(null)).toBe(true);
    });
  });

  describe('isAllNotDefined', () => {
    it('should return "false" if value is "string"', () => {
      expect(isAllNotDefined(['value'])).toBe(false);
      expect(isAllNotDefined(['value', 'some_value'])).toBe(false);
    });

    it('should return "false" if value is an empty"string"', () => {
      expect(isAllNotDefined([''])).toBe(false);
      expect(isAllNotDefined(['', ''])).toBe(false);
    });

    it('should return "false" if value is "number"', () => {
      expect(isAllNotDefined([10])).toBe(false);
      expect(isAllNotDefined([10, 20])).toBe(false);
    });

    it('should return "false" if value is "0"', () => {
      expect(isAllNotDefined([0])).toBe(false);
      expect(isAllNotDefined([0, 0])).toBe(false);
      expect(isAllNotDefined(['0'])).toBe(false);
      expect(isAllNotDefined(['0', '0'])).toBe(false);
    });

    it('should return "false" if value is an "object"', () => {
      expect(isAllNotDefined([{ a: 'some' }])).toBe(false);
      expect(isAllNotDefined([{ a: 'some' }, { b: 'other' }])).toBe(false);
      expect(isAllNotDefined([{}])).toBe(false);
      expect(isAllNotDefined([{}, {}])).toBe(false);
    });

    it('should return "false" if value is an "array" of arrays', () => {
      expect(isAllNotDefined([['some']])).toBe(false);
      expect(isAllNotDefined([['some'], ['some']])).toBe(false);
      expect(isAllNotDefined([[]])).toBe(false);
      expect(isAllNotDefined([[], []])).toBe(false);
    });

    it('should return "false" if value is a "Map"', () => {
      expect(isAllNotDefined([new Map()])).toBe(false);
      expect(isAllNotDefined([new Map(), new Map()])).toBe(false);
      expect(isAllNotDefined([new Map().set('a', 'b')])).toBe(false);
      expect(isAllNotDefined([new Map().set('a', 'b'), new Map().set('c', 'd')])).toBe(false);
    });

    it('should return "false" if value is a "Set"', () => {
      expect(isAllNotDefined([new Set()])).toBe(false);
      expect(isAllNotDefined([new Set(), new Set()])).toBe(false);
      expect(isAllNotDefined([new Set([1, 2, 3])])).toBe(false);
      expect(isAllNotDefined([new Set([1, 2, 3]), new Set([4, 5, 6])])).toBe(false);
    });

    it('should return "false" if value is invalid number', () => {
      expect(isAllNotDefined([NaN])).toBe(false);
      expect(isAllNotDefined([NaN, NaN])).toBe(false);
      expect(isAllNotDefined([Infinity])).toBe(false);
      expect(isAllNotDefined([Infinity, Infinity])).toBe(false);
      expect(isAllNotDefined([-Infinity])).toBe(false);
      expect(isAllNotDefined([-Infinity, -Infinity])).toBe(false);
    });

    it('should return "true" if value is "undefined"', () => {
      expect(isAllNotDefined([undefined])).toBe(true);
      expect(isAllNotDefined([undefined, undefined])).toBe(true);
    });

    it('should return "true" if value is "null"', () => {
      expect(isAllNotDefined([null])).toBe(true);
      expect(isAllNotDefined([null, null])).toBe(true);
    });

    it('should return "false" if at least one value is not defined', () => {
      expect(isAllNotDefined([1, undefined])).toBe(false);
      expect(isAllNotDefined([undefined, '2', undefined])).toBe(false);
      expect(isAllNotDefined([1, '2', undefined, 4])).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return "true" if value is "string"', () => {
      expect(isString('value')).toBe(true);
    });

    it('should return "true" if value is an empty "string"', () => {
      expect(isString('')).toBe(true);
    });

    it('should return "true" if value is a number "string"', () => {
      expect(isString('0')).toBe(true);
    });

    it('should return "false" if value is "number"', () => {
      expect(isString(10)).toBe(false);
    });

    it('should return "false" if value is "0"', () => {
      expect(isString(0)).toBe(false);
    });

    it('should return "false" if value is an "object"', () => {
      expect(isString({ a: 'some' })).toBe(false);
      expect(isString({})).toBe(false);
    });

    it('should return "false" if value is an "array"', () => {
      expect(isString(['some'])).toBe(false);
      expect(isString([])).toBe(false);
    });

    it('should return "false" if value is a "Map"', () => {
      expect(isString(new Map())).toBe(false);
      expect(isString(new Map().set('a', 'b'))).toBe(false);
    });

    it('should return "false" if value is a "Set"', () => {
      expect(isString(new Set())).toBe(false);
      expect(isString(new Set([1, 2, 3]))).toBe(false);
    });

    it('should return "false" if value is invalid number', () => {
      expect(isString(NaN)).toBe(false);
      expect(isString(Infinity)).toBe(false);
      expect(isString(-Infinity)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return "true" from boolean "true"', () => {
      expect(isBoolean(true)).toBe(true);
    });

    it('should return "true" from boolean "false"', () => {
      expect(isBoolean(true)).toBe(true);
    });

    it('should return "false" from string "true"', () => {
      expect(isBoolean('true')).toBe(false);
    });

    it('should return "false" from string "false"', () => {
      expect(isBoolean('false')).toBe(false);
    });

    it('should return "false" from "undefined"', () => {
      expect(isBoolean(undefined)).toBe(false);
    });

    it('should return "false" from string "null"', () => {
      expect(isBoolean(undefined)).toBe(false);
    });

    it('should return "false" from "1"', () => {
      expect(isBoolean(1)).toBe(false);
    });

    it('should return "false" from "0"', () => {
      expect(isBoolean(0)).toBe(false);
    });
  });
});
