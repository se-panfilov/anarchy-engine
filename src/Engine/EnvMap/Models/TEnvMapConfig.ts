import type { TEnvMapProps } from './TEnvMapProps';

export type TEnvMapConfig = TEnvMapProps &
  Readonly<{
    texture: string;
  }>;
