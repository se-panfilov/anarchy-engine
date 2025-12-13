import type { TEntity } from '@/Engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TWithPhysicsBodyEntities } from './TWithPhysicsBodyEntities';

export type TPhysicsBody = TEntity<TWithPhysicsBodyEntities> &
  Readonly<{
    setPhysicsBodyType: (type: RigidBodyTypesNames, wakeUp: boolean) => void;
    getPhysicsBodyType: () => RigidBodyTypesNames;
    getPhysicsBodyShape: () => CollisionShape;
  }>;
