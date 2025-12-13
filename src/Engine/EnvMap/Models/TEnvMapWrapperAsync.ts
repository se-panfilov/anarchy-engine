import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin } from '@/Engine/Mixins';

import type { TEnvMapPropsPack } from './TEnvMapPropsPack';

export type TEnvMapWrapperAsync = TWrapper<TEnvMapPropsPack> & TWithActiveMixin;
