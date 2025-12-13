import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { withPhysicsBodyEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBody, TPhysicsBodyEntities, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';

import { createPhysicsBody } from './PhysicsBodyUtils';

export function PhysicsBody(params: TPhysicsBodyParams, { world }: TPhysicsDependencies): TPhysicsBody {
  const entities: TPhysicsBodyEntities = createPhysicsBody(params, world);

  const { isSleep = false } = params;
  if (isSleep) entities.rigidBody?.sleep();

  return {
    ...AbstractEntity(withPhysicsBodyEntities(entities), EntityType.PhysicsBody, params),
    getPhysicsBodyType: () => params.type,
    getPhysicsBodyShape: () => params.collisionShape
  };
}
