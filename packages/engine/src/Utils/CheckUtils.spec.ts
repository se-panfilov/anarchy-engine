import { ColorWrapper } from '@Engine/Color';
import type { TDestroyable, TWithPosition2dProperty, TWithPosition3dProperty, TWithPosition4dProperty } from '@Engine/Mixins';
import { Subject } from 'rxjs';
import { Vector2, Vector3, Vector4 } from 'three';
import { describe, expect, it, vi } from 'vitest';

import {
  isAsyncEntityRegistry,
  isColorWrapper,
  isDestroyable,
  isEntityWith2dPosition,
  isEntityWith3dPosition,
  isEntityWith4dPosition,
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

  describe('isDestroyable', () => {
    it('should return "true" if "destroy" and "destroyed$" is defined', () => {
      const obj: TDestroyable = { destroy$: new Subject<void>() };
      expect(isDestroyable(obj)).toBe(true);
    });

    it('should return "false" if "destroy$" is NOT defined', () => {
      const obj: Omit<TDestroyable, 'destroy$'> = { some: 'whatever' };
      expect(isDestroyable(obj)).toBe(false);
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

      expect(isAsyncEntityRegistry(registry)).toBe(true);
    });

    it('should return "false" if it is a registry', () => {
      const registry: any = {
        getUniqWithSomeTag: vi.fn(),
        getUniqWithEveryTag: vi.fn(),
        getUniqByTag: vi.fn()
      };

      expect(isAsyncEntityRegistry(registry)).toBe(false);
    });
  });
});
