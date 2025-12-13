import type { TEnvMapProps } from './TEnvMapProps';
import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapParams = TEnvMapProps &
  Readonly<{
    texture: TEnvMapTexture;
  }>;
