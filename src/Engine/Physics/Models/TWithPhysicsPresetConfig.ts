import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';

export type TWithPhysicsPresetConfig = TPhysicsPresetConfig &
  Readonly<{
    presetName: string;
  }>;
