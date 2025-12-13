import type { RigidBodyType } from '@dimforge/rapier3d';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import { RigidBodyTypesMap } from '@/Engine/Physics/Constants';
import { withPhysicsBodyEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBody, TPhysicsBodyEntities, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';
import { isNotDefined } from '@/Engine/Utils';

import { createPhysicsBodyEntities } from './PhysicsBodyUtils';

export function PhysicsBody(params: TPhysicsBodyParams, { world }: TPhysicsDependencies): TPhysicsBody {
  const entities: TPhysicsBodyEntities = createPhysicsBodyEntities(params, world);

  const { isSleep = false } = params;
  if (isSleep) entities.rigidBody?.sleep();

  const abstract = AbstractEntity(withPhysicsBodyEntities(entities), EntityType.PhysicsBody, params);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstract, {
    setPhysicsBodyType: (type: RigidBodyTypesNames, wakeUp: boolean): void => {
      abstract.getRigidBody()?.setBodyType(RigidBodyTypesMap[type], wakeUp);
    },
    getPhysicsBodyType: (): RigidBodyTypesNames | never => {
      const bodyType: RigidBodyType | undefined = abstract.getRigidBody()?.bodyType();
      if (isNotDefined(bodyType)) return params.type;
      const match = Object.entries(RigidBodyTypesMap).find(([, value]): boolean => value === bodyType);
      const result: RigidBodyTypesNames | undefined = match?.[0] as RigidBodyTypesNames | undefined;

      if (isNotDefined(result)) throw new Error(`PhysicsBody: RigidBody type is not defined for object with name "${params.name}"`);
      return result;
    },
    getPhysicsBodyShape: (): CollisionShape => params.collisionShape
  });
}
