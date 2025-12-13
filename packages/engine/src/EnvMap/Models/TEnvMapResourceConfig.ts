import type { TAbstractResourceConfig } from '@/Abstract';

import type { TEnvMapTextureOptions } from './TEnvMapTextureOptions';

export type TEnvMapResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TEnvMapTextureOptions;
  }>;
