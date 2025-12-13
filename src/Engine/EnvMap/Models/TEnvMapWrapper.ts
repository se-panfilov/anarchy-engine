import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapWrapper = TWrapper<TEnvMapTexture> &
  TWithActiveMixin &
  Readonly<{
    // TODO 9.0.0. RESOURCES: all wrappers with preloaded resources should have a name
    getName: () => string;
  }>;
