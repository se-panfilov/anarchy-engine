import type { RigidBody } from '@dimforge/rapier3d';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { scalableMixin, withMoveBy3dMixin, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TPhysicsBodyWrapper, TPhysicsParams } from '@/Engine/Physics/Models';
import { applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

import { createPhysicsBody } from './PhysicsBodyUtils';

export function PhysicsBodyWrapper(params: TPhysicsParams): TPhysicsBodyWrapper {
  const entity: RigidBody = createPhysicsBody(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Physics, params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);

  return result;
}
