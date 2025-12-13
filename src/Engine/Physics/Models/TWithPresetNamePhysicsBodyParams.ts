import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TWithPresetNamePhysicsBodyParams = TOptional<TPhysicsBodyParams> &
  Readonly<{
    presetName?: string;
  }>;
