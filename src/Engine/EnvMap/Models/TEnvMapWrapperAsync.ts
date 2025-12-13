import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TEnvMap } from './TEnvMap';

export type TEnvMapWrapperAsync = Readonly<{
  getUrl: () => string;
}> &
  TWrapper<TEnvMap> &
  TWithActiveMixin;
