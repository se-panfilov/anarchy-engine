import type { TEntity } from '@Anarchy/Engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@Anarchy/Engine/Physics/Constants';

import type { TPhysicsShapeParams } from './TPhysicsShapeParams';
import type { TWithPhysicsBodyEntities } from './TWithPhysicsBodyEntities';

export type TPhysicsBody = TEntity<TWithPhysicsBodyEntities> &
  Readonly<{
    setPhysicsBodyType: (type: RigidBodyTypesNames, wakeUp: boolean) => void;
    getPhysicsBodyType: () => RigidBodyTypesNames;
    getPhysicsBodyShape: () => CollisionShape;
    getShapeParams: () => TPhysicsShapeParams;
  }>;
