import { AbstractWrapper, FacadeType } from '@/Engine/Abstract';
import { withPhysicsBodyFacadeEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBodyFacade, TPhysicsBodyFacadeEntities, TPhysicsFacadeDependencies, TPhysicsPresetParams } from '@/Engine/Physics/Models';

import { createPhysicsBody } from './PhysicsBodyUtils';

export function PhysicsBodyFacade(params: TPhysicsPresetParams, { world }: TPhysicsFacadeDependencies): TPhysicsBodyFacade {
  const entities: TPhysicsBodyFacadeEntities = createPhysicsBody(params, world);

  const result = {
    ...AbstractWrapper(entities, FacadeType.PhysicsBody, params),
    ...withPhysicsBodyFacadeEntities(entities)
  };

  return result;
}
