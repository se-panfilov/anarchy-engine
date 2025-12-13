import type { TPhysicsBodyParams } from '@/Engine/Physics';
import { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics';
import type { TOptional } from '@/Engine/Utils';

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
