import { BehaviorSubject, Observable } from 'rxjs';
import { Vector2, Vector3, Vector4 } from 'three';

import { ColorWrapper } from '@/Engine/Domains/Color';
import { Vector2Wrapper, Vector3Wrapper, Vector4Wrapper } from '@/Engine/Domains/Vector';
import type { IDestroyable, IRegistrable, IWithPosition2dProperty, IWithPosition3dProperty, IWithPosition4dProperty } from '@/Engine/Mixins';

import {
  isColorWrapper,
  isDefined,
  isDestroyable,
  isEntityWith2dPosition,
  isEntityWith3dPosition,
  isEntityWith4dPosition,
  isNotDefined,
  isRegistrable,
  isString,
  isVector2,
  isVector2Wrapper,
  isVector3,
  isVector3Wrapper,
  isVector4,
  isVector4Wrapper,
  isWithWrapperId
} from './CheckUtils';

describe('CheckUtils', () => {
  const entity2d: IWithPosition2dProperty = { position: Vector2Wrapper({ x: 10, y: 10 }).entity };
  const entity3d: IWithPosition3dProperty = { position: Vector3Wrapper({ x: 10, y: 10, z: 10 }).entity };
  const entity4d: IWithPosition4dProperty = { position: Vector4Wrapper({ x: 10, y: 10, z: 10, w: 10 }).entity };

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
    it('should return "true"', () => {
      const obj: Partial<IRegistrable> = { id: 'mock-id', getTags: vi.fn(), addTag: vi.fn() };
      expect(isRegistrable(obj)).toBe(true);
    });

    it('should return "false" if  "getTags" is "undefined"', () => {
      const obj: Partial<IRegistrable> = { id: 'mock-id', addTag: vi.fn() };
      expect(isRegistrable(obj)).toBe(false);
    });

    it('should return "false" if addTag is undefined', () => {
      const obj: Partial<IRegistrable> = { id: 'mock-id', getTags: vi.fn() };
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
      expect(isVector2(new Vector2(10, 10))).toBe(true);
      expect(isVector2(new Vector2(0, 0))).toBe(true);
    });

    it('should return "false" if it is a vector3', () => {
      expect(isVector2(new Vector3(0, 0))).toBe(false);
      expect(isVector2(new Vector3(0, 0, 0))).toBe(false);
      expect(isVector2(new Vector3(10, 10))).toBe(false);
      expect(isVector2(new Vector3(10, 10, 10))).toBe(false);
    });

    it('should return "true" if it is a vector4', () => {
      expect(isVector2(new Vector4(0, 0, 0, 0))).toBe(false);
      expect(isVector2(new Vector4(10, 10, 10, 10))).toBe(false);
    });
  });

  describe('isVector3', () => {
    it('should return "false" if it is a vector2', () => {
      expect(isVector3(new Vector2(0, 0))).toBe(false);
      expect(isVector3(new Vector2(10, 10))).toBe(false);
    });

    it('should return "true" if it is a vector3', () => {
      expect(isVector3(new Vector3(0, 0))).toBe(true);
      expect(isVector3(new Vector3(0, 0, 0))).toBe(true);
      expect(isVector3(new Vector3(10, 10))).toBe(true);
      expect(isVector3(new Vector3(10, 10, 10))).toBe(true);
    });

    it('should return "false" if it is a vector4', () => {
      expect(isVector3(new Vector4(0, 0, 0, 0))).toBe(false);
      expect(isVector3(new Vector4(10, 10, 10, 10))).toBe(false);
    });
  });

  describe('isVector4', () => {
    it('should return "false" if it is a vector2 ', () => {
      expect(isVector4(new Vector2(10, 10))).toBe(false);
      expect(isVector4(new Vector2(0, 0))).toBe(false);
    });

    it('should return "false" if it is a vector3 ', () => {
      expect(isVector4(new Vector3(0, 0))).toBe(false);
      expect(isVector4(new Vector3(0, 0, 0))).toBe(false);
      expect(isVector4(new Vector3(10, 10))).toBe(false);
      expect(isVector4(new Vector3(10, 10, 10))).toBe(false);
    });

    it('should return "true" if it is a vector4 ', () => {
      expect(isVector4(new Vector4(0, 0, 0, 0))).toBe(true);
      expect(isVector4(new Vector4(10, 10, 10, 10))).toBe(true);
    });
  });

  describe('isVector2Wrapper', () => {
    it('should return "true" if it is a vector2 wrapper', () => {
      expect(isVector2Wrapper(Vector2Wrapper({ x: 10, y: 10 }))).toBe(true);
      expect(isVector2Wrapper(Vector2Wrapper({ x: 0, y: 0 }))).toBe(true);
    });

    it('should return "false" if it is a vector3 wrapper', () => {
      expect(isVector2Wrapper(Vector3Wrapper({ x: 0, y: 0 }))).toBe(false);
      expect(isVector2Wrapper(Vector3Wrapper({ x: 0, y: 0, z: 0 }))).toBe(false);
      expect(isVector2Wrapper(Vector3Wrapper({ x: 10, y: 10 }))).toBe(false);
      expect(isVector2Wrapper(Vector3Wrapper({ x: 10, y: 10, z: 10 }))).toBe(false);
    });

    it('should return "true" if it is a vector4 wrapper', () => {
      expect(isVector2Wrapper(Vector4Wrapper({ x: 0, y: 0, z: 0, w: 0 }))).toBe(false);
      expect(isVector2Wrapper(Vector4Wrapper({ x: 10, y: 10, z: 10, w: 10 }))).toBe(false);
    });
  });

  describe('isVector3Wrapper', () => {
    it('should return "false" if it is a vector2 wrapper', () => {
      expect(isVector3Wrapper(Vector2Wrapper({ x: 0, y: 0 }))).toBe(false);
      expect(isVector3Wrapper(Vector2Wrapper({ x: 10, y: 10 }))).toBe(false);
    });

    it('should return "true" if it is a vector3 wrapper', () => {
      expect(isVector3Wrapper(Vector3Wrapper({ x: 0, y: 0 }))).toBe(true);
      expect(isVector3Wrapper(Vector3Wrapper({ x: 0, y: 0, z: 0 }))).toBe(true);
      expect(isVector3Wrapper(Vector3Wrapper({ x: 10, y: 10 }))).toBe(true);
      expect(isVector3Wrapper(Vector3Wrapper({ x: 10, y: 10, z: 10 }))).toBe(true);
    });

    it('should return "false" if it is a vector4 wrapper', () => {
      expect(isVector3Wrapper(Vector4Wrapper({ x: 0, y: 0, z: 0, w: 0 }))).toBe(false);
      expect(isVector3Wrapper(Vector4Wrapper({ x: 10, y: 10, z: 10, w: 10 }))).toBe(false);
    });
  });

  describe('isVector4Wrapper', () => {
    it('should return "false" if it is a vector2 wrapper', () => {
      expect(isVector4Wrapper(Vector2Wrapper({ x: 10, y: 10 }))).toBe(false);
      expect(isVector4Wrapper(Vector2Wrapper({ x: 0, y: 0 }))).toBe(false);
    });

    it('should return "false" if it is a vector3 wrapper', () => {
      expect(isVector4Wrapper(Vector3Wrapper({ x: 0, y: 0 }))).toBe(false);
      expect(isVector4Wrapper(Vector3Wrapper({ x: 0, y: 0, z: 0 }))).toBe(false);
      expect(isVector4Wrapper(Vector3Wrapper({ x: 10, y: 10 }))).toBe(false);
      expect(isVector4Wrapper(Vector3Wrapper({ x: 10, y: 10, z: 10 }))).toBe(false);
    });

    it('should return "true" if it is a vector4 wrapper', () => {
      expect(isVector4Wrapper(Vector4Wrapper({ x: 0, y: 0, z: 0, w: 0 }))).toBe(true);
      expect(isVector4Wrapper(Vector4Wrapper({ x: 10, y: 10, z: 10, w: 10 }))).toBe(true);
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
});
