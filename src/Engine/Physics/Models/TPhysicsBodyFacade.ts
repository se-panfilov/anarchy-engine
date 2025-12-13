import type { TFacade } from '@/Engine/Abstract';
import type { CollisionShape, RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TWithPhysicsBodyFacadeEntities } from './TWithPhysicsBodyFacadeEntities';

export type TPhysicsBodyFacade = TFacade<TWithPhysicsBodyFacadeEntities> &
  Readonly<{
    getPhysicsBodyType: () => RigidBodyTypesNames;
    getPhysicsBodyShape: () => CollisionShape;
    shouldUpdateKinematic: () => boolean;
    setShouldUpdateKinematic: (value: boolean) => void;
  }>;
