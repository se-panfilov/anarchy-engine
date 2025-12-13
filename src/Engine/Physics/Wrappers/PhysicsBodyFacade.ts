import { FacadeType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import { withPhysicsBodyFacadeEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBodyFacade, TPhysicsBodyFacadeEntities, TPhysicsBodyParams, TPhysicsFacadeDependencies } from '@/Engine/Physics/Models';

import { createPhysicsBody } from './PhysicsBodyUtils';

export function PhysicsBodyFacade(params: TPhysicsBodyParams, { world }: TPhysicsFacadeDependencies): TPhysicsBodyFacade {
  const entities: TPhysicsBodyFacadeEntities = createPhysicsBody(params, world);

  const result = {
    ...AbstractFacade(entities, FacadeType.PhysicsBody, params),
    ...withPhysicsBodyFacadeEntities(entities)
  };

  return result;
}
