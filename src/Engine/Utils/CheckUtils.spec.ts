import { BehaviorSubject, Observable } from 'rxjs';

import type { IDestroyable, IRegistrable } from '@/Engine/Mixins';
import { ColorWrapper } from '@/Engine/Wrappers';

import { isColorWrapper, isDefined, isDestroyable, isNotDefined, isRegistrable, isString } from './CheckUtils';

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

  describe('isRegistrable', () => {
    it('should return "true" if "isRegistrable" is "true"', () => {
      const obj: IRegistrable = { id: 'mock-id', tags: [], isRegistrable: true };
      expect(isRegistrable(obj)).toBe(true);
    });

    it('should return "false" if  "isRegistrable" is "false"', () => {
      const obj: IRegistrable = { id: 'mock-id', tags: [], isRegistrable: false };
      expect(isRegistrable(obj)).toBe(false);
    });

    it('should return "false" if isRegistrable is false', () => {
      const obj: IRegistrable = { id: 'mock-id', tags: [], isRegistrable: false };
      expect(isRegistrable(obj)).toBe(false);
    });
  });

  describe('isDestroyable', () => {
    it('should return "true" if "destroy" and "destriyed$" is defined', () => {
      const obj: IDestroyable = { destroy: () => undefined, destroyed$: new Observable<void>(), isDestroyed: (): boolean => false };
      expect(isDestroyable(obj)).toBe(true);
    });

    it('should return "false" if "destroy" is NOT defined', () => {
      const obj: Omit<IDestroyable, 'destroy'> = { destroyed$: new Observable<void>(), isDestroyed: (): boolean => false };
      expect(isDestroyable(obj)).toBe(false);
    });

    it('should return "false" if "destroyed$" is NOT defined', () => {
      const obj: Omit<IDestroyable, 'destroyed$'> = { destroy: () => undefined, isDestroyed: (): boolean => false };
      expect(isDestroyable(obj)).toBe(false);
    });

    it('should return "false" if "isDestroyed" is NOT defined', () => {
      const obj: any = { destroy: () => undefined, destroyed$: new BehaviorSubject<boolean>(false).asObservable() };
      expect(isDestroyable(obj)).toBe(false);
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

  describe('isColorWrapper', () => {
    it('should return "true" if it is a color wrapper', () => {
      expect(isColorWrapper(ColorWrapper('#FF0000'))).toBe(true);
    });

    it('should return "false" if it is a string', () => {
      expect(isColorWrapper('#FF0000')).toBe(false);
    });
  });
});
