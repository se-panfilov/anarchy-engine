import type { TAbstractResourceConfig } from '@hellpig/anarchy-engine/Abstract';

import type { TEnvMapTextureOptions } from './TEnvMapTextureOptions';

export type TEnvMapResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TEnvMapTextureOptions;
  }>;
