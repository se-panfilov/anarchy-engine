import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TWithActiveMixin } from '@Anarchy/Engine/Mixins';

import type { TEnvMapConfig } from './TEnvMapConfig';
import type { TEnvMapConfigToParamsDependencies } from './TEnvMapConfigToParamsDependencies';
import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapWrapper = Omit<TWrapper<TEnvMapTexture>, 'serialize'> &
  Readonly<{
    serialize: (dependencies: TEnvMapConfigToParamsDependencies) => TEnvMapConfig;
  }> &
  TWithActiveMixin;
