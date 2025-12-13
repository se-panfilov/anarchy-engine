import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import { RigidBodyTypesMap } from '@/Engine/Physics/Constants';
import { withPhysicsBodyEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBody, TPhysicsBodyEntities, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';

import { createPhysicsBodyEntities } from './PhysicsBodyUtils';

export function PhysicsBody(params: TPhysicsBodyParams, { world }: TPhysicsDependencies): TPhysicsBody {
  const entities: TPhysicsBodyEntities = createPhysicsBodyEntities(params, world);

  const { isSleep = false } = params;
  if (isSleep) entities.rigidBody?.sleep();

  return {
    ...AbstractEntity(withPhysicsBodyEntities(entities), EntityType.PhysicsBody, params),
    setPhysicsBodyType: (type: RigidBodyTypesNames, wakeUp: boolean): void => {
      entities.rigidBody?.setBodyType(RigidBodyTypesMap[type], wakeUp);
    },
    getPhysicsBodyType: (): RigidBodyTypesNames => params.type,
    getPhysicsBodyShape: (): CollisionShape => params.collisionShape
  };
}
