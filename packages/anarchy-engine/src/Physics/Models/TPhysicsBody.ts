import type { TEntity } from '@hellpig/anarchy-engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@hellpig/anarchy-engine/Physics/Constants';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';
import type { TWithPhysicsBodyEntities } from './TWithPhysicsBodyEntities';

export type TPhysicsBody = TEntity<TWithPhysicsBodyEntities> &
  Readonly<{
    setPhysicsBodyType: (type: RigidBodyTypesNames, wakeUp: boolean) => void;
    getPhysicsBodyType: () => RigidBodyTypesNames;
    getPhysicsBodyShape: () => CollisionShape;
    getShapeParams: () => TPhysicsShapeParams;
  }>;
