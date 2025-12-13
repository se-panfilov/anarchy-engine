import type { TAbstractResourceConfig } from '@/Engine/Abstract';

import type { TEnvMapTextureParams } from './TEnvMapTextureParams';

export type TEnvMapResourceConfig = Omit<TAbstractResourceConfig, 'params'> &
  Readonly<{
    params?: TEnvMapTextureParams;
  }>;
