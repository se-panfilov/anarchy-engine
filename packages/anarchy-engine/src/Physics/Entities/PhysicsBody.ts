import type { RigidBodyType, World } from '@dimforge/rapier3d';
import { AbstractEntity, EntityType } from '@Anarchy/Engine/Abstract';
import { physicsBodyToConfig } from '@Anarchy/Engine/Physics/Adapters';
import type { CollisionShape, RigidBodyTypesNames } from '@Anarchy/Engine/Physics/Constants';
import { RigidBodyTypesMap } from '@Anarchy/Engine/Physics/Constants';
import { withPhysicsBodyEntities } from '@Anarchy/Engine/Physics/Mixins';
import type { TPhysicsBody, TPhysicsBodyConfig, TPhysicsBodyEntities, TPhysicsBodyParams, TPhysicsDependencies, TPhysicsShapeParams } from '@Anarchy/Engine/Physics/Models';
import type { TWriteable } from '@Shared/Utils';
import { isDefined, isNotDefined } from '@Shared/Utils';
import type { Subscription } from 'rxjs';

import { createPhysicsBodyEntities } from './PhysicsBodyUtils';

export function PhysicsBody(params: TPhysicsBodyParams, { physicsWorldService }: TPhysicsDependencies): TPhysicsBody {
  const world: World = physicsWorldService.getWorld();
  const entities: TPhysicsBodyEntities = createPhysicsBodyEntities(params, world);

  const { isSleep = false } = params;
  if (isSleep) entities.rigidBody?.sleep();

  const abstract = AbstractEntity(withPhysicsBodyEntities(entities), EntityType.PhysicsBody, params);

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
    getShapeParams: (): TPhysicsShapeParams => params.shapeParams,
    serialize: (): TPhysicsBodyConfig => physicsBodyToConfig(result)
  });

  return result;
}
