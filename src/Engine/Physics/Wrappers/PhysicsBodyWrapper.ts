import type { RigidBody } from '@dimforge/rapier3d';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { withMoveBy3dMixin, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TPhysicsBodyWrapper, TPhysicsPresetParams } from '@/Engine/Physics/Models';
import { applyPosition, applyRotation, isDefined } from '@/Engine/Utils';

import { createPhysicsBody } from './PhysicsBodyUtils';

export function PhysicsBodyWrapper(params: TPhysicsPresetParams): TPhysicsBodyWrapper {
  const entity: RigidBody = createPhysicsBody(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Physics, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    entity
  };

  if (isDefined(params.position)) applyPosition(result, params.position);
  if (isDefined(params.rotation)) applyRotation(result, params.rotation);

  return result;
}
