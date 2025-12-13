import type { TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';

import type { TEnvMapTextureOptions } from './TEnvMapTextureOptions';

export type TEnvMapResourceConfig = Omit<TAbstractResourceConfig, 'options'> &
  Readonly<{
    options?: TEnvMapTextureOptions;
  }>;
