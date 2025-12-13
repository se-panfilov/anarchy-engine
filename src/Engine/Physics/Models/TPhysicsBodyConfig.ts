import type { RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TPhysicsBodyParams, 'type'> &
  Readonly<{
    type: RigidBodyTypesNames;
  }>;
