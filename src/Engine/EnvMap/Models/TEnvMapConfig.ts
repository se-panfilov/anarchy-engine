import type { TEnvMapParams } from './TEnvMapParams';

export type TEnvMapConfig = Omit<TEnvMapParams, 'texture'> &
  Readonly<{
    texture: string;
  }>;
