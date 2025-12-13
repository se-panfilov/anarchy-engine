import type { RigidBodyTypesNames } from '@/Engine/Physics/Constants';

import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TPhysicsPresetConfig = Omit<TPhysicsPresetParams, 'type'> &
  Readonly<{
    preset: string;
    type: RigidBodyTypesNames;
  }>;
