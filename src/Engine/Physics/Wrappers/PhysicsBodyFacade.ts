import { EntityType } from '@/Engine/Abstract';
import { AbstractFacade } from '@/Engine/Abstract/Wrappers/AbstractFacade';
import { withPhysicsBodyFacadeEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBodyFacade, TPhysicsBodyFacadeEntities, TPhysicsBodyParams, TPhysicsFacadeDependencies } from '@/Engine/Physics/Models';

import { createPhysicsBody } from './PhysicsBodyUtils';

export function PhysicsBodyFacade(params: TPhysicsBodyParams, { world }: TPhysicsFacadeDependencies): TPhysicsBodyFacade {
  const entities: TPhysicsBodyFacadeEntities = createPhysicsBody(params, world);

  let _shouldUpdateKinematic: boolean = params.shouldUpdateKinematic ?? true;

  const { isSleep = false } = params;
  if (isSleep) entities.rigidBody?.sleep();

  return {
    ...AbstractFacade(withPhysicsBodyFacadeEntities(entities), EntityType.PhysicsBody, params),
    getPhysicsBodyType: () => params.type,
    getPhysicsBodyShape: () => params.collisionShape,
    shouldUpdateKinematic: () => _shouldUpdateKinematic,
    setShouldUpdateKinematic: (value: boolean) => void (_shouldUpdateKinematic = value)
  };
}
