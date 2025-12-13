import type { TWithName } from '@/Engine/Mixins';
import type { RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TOptional<TPhysicsBodyParams>, 'type' | 'name'> &
  TOptional<
    Readonly<{
      type: RigidBodyTypesNames;
    }>
  > &
  Required<TWithName>;
