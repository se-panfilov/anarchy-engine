import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TWithPresetPhysicsBodyParams = TOptional<TPhysicsBodyParams> &
  Readonly<{
    presetName?: string;
  }>;
