import { BehaviorSubject, Subject } from 'rxjs';
import { Vector2, Vector3, Vector4 } from 'three';

import { ColorWrapper } from '@/Engine/Color';
import type { TDestroyable, TWithPosition2dProperty, TWithPosition3dProperty, TWithPosition4dProperty } from '@/Engine/Mixins';

import {
  isAllDefined,
  isAllNotDefined,
  isAsyncRegistry,
  isBoolean,
  isColorWrapper,
  isDefined,
  isDestroyable,
  isEntityWith2dPosition,
  isEntityWith3dPosition,
  isEntityWith4dPosition,
  isNotDefined,
  isString,
  isVector2Like,
  isVector3Like,
  isVector4Like,
  isWithUserData,
  isWithWrapperId,
  isWithWrapperIdAccessors
} from './CheckUtils';

describe('CheckUtils', () => {
  const entity2d: TWithPosition2dProperty = { position: new Vector2(10, 10) };
  const entity3d: TWithPosition3dProperty = { position: new Vector3(10, 10, 10) };
  const entity4d: TWithPosition4dProperty = { position: new Vector4(10, 10, 10, 10) };

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

  describe('isDestroyable', () => {
    it('should return "true" if "destroy" and "destroyed$" is defined', () => {
      const obj: TDestroyable = { destroy$: new Subject<void>(), isDestroyed: (): boolean => false };
      expect(isDestroyable(obj)).toBe(true);
    });

    it('should return "false" if "destroy$" is NOT defined', () => {
      const obj: Omit<TDestroyable, 'destroy$'> = { isDestroyed: (): boolean => false };
      expect(isDestroyable(obj)).toBe(false);
    });

    it('should return "false" if "isDestroyed" is NOT defined', () => {
      const obj: any = { destroy: () => undefined, destroy$: new BehaviorSubject<boolean>(false).asObservable() };
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

  describe('isWithUserData', () => {
    it('should return "true" an object has userData', () => {
      expect(isWithUserData({ userData: {} })).toBe(true);
      expect(isWithUserData({ userData: { wrapperId: 'some' } })).toBe(true);
    });

    it('should return "false" an object has NO wrapperId', () => {
      expect(isWithUserData({})).toBe(false);
    });
  });

  describe('IWithWrapperIdAccessors', () => {
    it('should return "true" an object has accessors', () => {
      expect(isWithWrapperIdAccessors({ setWrapperId: vi.fn(), getWrapperId: vi.fn() })).toBe(true);
    });

    it('should return "false" an object has NO accessors', () => {
      expect(isWithWrapperIdAccessors({})).toBe(false);
    });
  });

  describe('isWithWrapperId', () => {
    it('should return "true" an object has wrapperId', () => {
      expect(isWithWrapperId({ userData: { wrapperId: 'some' } })).toBe(true);
    });

    it('should return "false" an object has NO wrapperId', () => {
      expect(isWithWrapperId(undefined)).toBe(false);
      expect(isWithWrapperId({})).toBe(false);
      expect(isWithWrapperId({ userData: {} })).toBe(false);
    });
  });

  describe('isVector2', () => {
    it('should return "true" if it is a vector2 wrapper', () => {
      expect(isVector2Like(new Vector2(10, 10))).toBe(true);
      expect(isVector2Like(new Vector2(0, 0))).toBe(true);
    });

    it('should return "false" if it is a vector3', () => {
      expect(isVector2Like(new Vector3(0, 0))).toBe(false);
      expect(isVector2Like(new Vector3(0, 0, 0))).toBe(false);
      expect(isVector2Like(new Vector3(10, 10))).toBe(false);
      expect(isVector2Like(new Vector3(10, 10, 10))).toBe(false);
    });

    it('should return "true" if it is a vector4', () => {
      expect(isVector2Like(new Vector4(0, 0, 0, 0))).toBe(false);
      expect(isVector2Like(new Vector4(10, 10, 10, 10))).toBe(false);
    });
  });

  describe('isVector3', () => {
    it('should return "false" if it is a vector2', () => {
      expect(isVector3Like(new Vector2(0, 0))).toBe(false);
      expect(isVector3Like(new Vector2(10, 10))).toBe(false);
    });

    it('should return "true" if it is a vector3', () => {
      expect(isVector3Like(new Vector3(0, 0))).toBe(true);
      expect(isVector3Like(new Vector3(0, 0, 0))).toBe(true);
      expect(isVector3Like(new Vector3(10, 10))).toBe(true);
      expect(isVector3Like(new Vector3(10, 10, 10))).toBe(true);
    });

    it('should return "false" if it is a vector4', () => {
      expect(isVector3Like(new Vector4(0, 0, 0, 0))).toBe(false);
      expect(isVector3Like(new Vector4(10, 10, 10, 10))).toBe(false);
    });
  });

  describe('isVector4', () => {
    it('should return "false" if it is a vector2 ', () => {
      expect(isVector4Like(new Vector2(10, 10))).toBe(false);
      expect(isVector4Like(new Vector2(0, 0))).toBe(false);
    });

    it('should return "false" if it is a vector3 ', () => {
      expect(isVector4Like(new Vector3(0, 0))).toBe(false);
      expect(isVector4Like(new Vector3(0, 0, 0))).toBe(false);
      expect(isVector4Like(new Vector3(10, 10))).toBe(false);
      expect(isVector4Like(new Vector3(10, 10, 10))).toBe(false);
    });

    it('should return "true" if it is a vector4 ', () => {
      expect(isVector4Like(new Vector4(0, 0, 0, 0))).toBe(true);
      expect(isVector4Like(new Vector4(10, 10, 10, 10))).toBe(true);
    });
  });

  describe('isEntityWith2dPosition', () => {
    it('should return "true" for entity with 2d position', () => {
      expect(isEntityWith2dPosition(entity2d)).toBe(true);
    });

    it('should return "false" for entity with 3d position', () => {
      expect(isEntityWith2dPosition(entity3d)).toBe(false);
    });

    it('should return "false" for entity with 4d position', () => {
      expect(isEntityWith2dPosition(entity4d)).toBe(false);
    });
  });

  describe('isEntityWith3dPosition', () => {
    it('should return "false" for entity with 2d position', () => {
      expect(isEntityWith3dPosition(entity2d)).toBe(false);
    });

    it('should return "true" for entity with 3d position', () => {
      expect(isEntityWith3dPosition(entity3d)).toBe(true);
    });

    it('should return "false" for entity with 4d position', () => {
      expect(isEntityWith3dPosition(entity4d)).toBe(false);
    });
  });

  describe('isEntityWith4dPosition', () => {
    it('should return "false" for entity with 2d position', () => {
      expect(isEntityWith4dPosition(entity2d)).toBe(false);
    });

    it('should return "false" for entity with 3d position', () => {
      expect(isEntityWith4dPosition(entity3d)).toBe(false);
    });

    it('should return "true" for entity with 4d position', () => {
      expect(isEntityWith4dPosition(entity4d)).toBe(true);
    });
  });

  describe('isAsyncRegistry', () => {
    it('should return "true" if it is an async registry', () => {
      const registry: any = {
        findByTagsAsync: vi.fn(),
        findByTagAsync: vi.fn()
      };

      expect(isAsyncRegistry(registry)).toBe(true);
    });

    it('should return "false" if it is a registry', () => {
      const registry: any = {
        getUniqWithSomeTag: vi.fn(),
        getUniqWithEveryTag: vi.fn(),
        getUniqByTag: vi.fn()
      };

      expect(isAsyncRegistry(registry)).toBe(false);
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
