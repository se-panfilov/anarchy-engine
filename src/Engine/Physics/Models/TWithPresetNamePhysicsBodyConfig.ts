import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';

export type TWithPresetNamePhysicsBodyConfig = Omit<TPhysicsBodyConfig, 'tags'> &
  Readonly<{
    presetName?: string;
  }>;
