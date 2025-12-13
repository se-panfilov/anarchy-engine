import type { TEnvMapProps } from './TEnvMapProps';
import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapParams = Omit<TEnvMapProps, 'texture'> &
  Readonly<{
    texture: TEnvMapTexture;
  }>;
