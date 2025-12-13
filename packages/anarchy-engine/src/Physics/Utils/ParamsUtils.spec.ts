import type { TPhysicsBodyParams } from '@Anarchy/Engine/Physics';
import { CollisionShape, RigidBodyTypesNames } from '@Anarchy/Engine/Physics';
import type { TOptional } from '@Shared/Utils';
import { Quaternion } from 'three';
import { Vector3 } from 'three/src/math/Vector3';
import { describe, expect, it } from 'vitest';

import { isPhysicsBodyParamsComplete } from './ParamsUtils';

describe('ParamsUtils', () => {
  describe('isPhysicsBodyParamsComplete', () => {
    it('should return "true" if all the params are in place', () => {
      const params: TPhysicsBodyParams = {
        name: 'test',
        type: RigidBodyTypesNames.Dynamic,
        collisionShape: CollisionShape.Cuboid,
        shapeParams: {
          hx: 1,
          hy: 1,
          hz: 1
        },
        position: new Vector3(),
        rotation: new Quaternion(),
        tags: []
      };
      expect(isPhysicsBodyParamsComplete(params)).toBe(true);
    });

    it('should return "false" if NOT all the params are in place', () => {
      const params: TOptional<TPhysicsBodyParams> = {
        name: 'test',
        type: RigidBodyTypesNames.Fixed,
        collisionShape: CollisionShape.Ball,
        tags: []
      };
      expect(isPhysicsBodyParamsComplete(params)).toBe(false);
    });
  });
});
