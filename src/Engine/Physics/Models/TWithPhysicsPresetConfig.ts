import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';

export type TWithPhysicsPresetConfig = TPhysicsPresetConfig &
  Readonly<{
    preset: string;
  }>;
