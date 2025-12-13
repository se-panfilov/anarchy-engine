import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapWrapper = Readonly<{
  getTexture: () => TEnvMapTexture;
}> &
  TWrapper<TEnvMapTexture> &
  TWithActiveMixin;
