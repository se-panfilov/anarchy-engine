import type { TAbstractResourceConfig } from '@/Engine/Abstract';

import type { TEnvMapTextureParams } from './TEnvMapTextureParams';

export type TEnvMapResourceConfig = TAbstractResourceConfig &
  Readonly<{
    params?: TEnvMapTextureParams;
  }>;
