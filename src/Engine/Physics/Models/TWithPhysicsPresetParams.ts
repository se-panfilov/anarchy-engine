import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TWithPhysicsPresetParams = TOptional<TPhysicsPresetParams> &
  Readonly<{
    preset?: string;
  }>;
