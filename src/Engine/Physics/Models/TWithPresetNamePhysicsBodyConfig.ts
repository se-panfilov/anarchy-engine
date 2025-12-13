import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';

export type TWithPresetNamePhysicsBodyConfig = TPhysicsBodyConfig &
  Readonly<{
    presetName?: string;
  }>;
