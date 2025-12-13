import type { RigidBodyType } from '@dimforge/rapier3d';
import type { Subscription } from 'rxjs';

import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { physicsToConfig } from '@/Engine/Physics/Adapters';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import { RigidBodyTypesMap } from '@/Engine/Physics/Constants';
import { withPhysicsBodyEntities } from '@/Engine/Physics/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig, TPhysicsBodyEntities, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

import { createPhysicsBodyEntities } from './PhysicsBodyUtils';

export function PhysicsBody(params: TPhysicsBodyParams, { world }: TPhysicsDependencies): TPhysicsBody {
  const entities: TPhysicsBodyEntities = createPhysicsBodyEntities(params, world);

  const { isSleep = false } = params;
  if (isSleep) entities.rigidBody?.sleep();

  const abstract = AbstractEntity(withPhysicsBodyEntities(entities), EntityType.PhysicsBody, { name: params.name });

  const destroySub$: Subscription = abstract.destroy$.subscribe((): void => {
    if (isDefined(entities.rigidBody)) world.removeRigidBody(entities.rigidBody);
    // eslint-disable-next-line functional/immutable-data
    (entities as TWriteable<TPhysicsBodyEntities>).rigidBody = null as any;
    if (isDefined(entities.collider)) world.removeCollider(entities.collider, true);
    // eslint-disable-next-line functional/immutable-data
    (entities as TWriteable<TPhysicsBodyEntities>).collider = null as any;

    destroySub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(abstract, {
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
    getPhysicsBodyShape: (): CollisionShape => params.collisionShape,
    serialize: (): TPhysicsBodyConfig => physicsToConfig(result)
  });

  return result;
}
