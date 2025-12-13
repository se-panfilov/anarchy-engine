import type { TEntity } from '@/Engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TWithPhysicsBodyEntities } from './TWithPhysicsBodyEntities';

export type TPhysicsBody = TEntity<TWithPhysicsBodyEntities> &
  Readonly<{
    getPhysicsBodyType: () => RigidBodyTypesNames;
    getPhysicsBodyShape: () => CollisionShape;
    shouldUpdateKinematic: () => boolean;
    setShouldUpdateKinematic: (value: boolean) => void;
  }>;
