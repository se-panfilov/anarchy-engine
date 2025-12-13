import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TEnvMapConfig } from './TEnvMapConfig';
import type { TEnvMapParams } from './TEnvMapParams';
import type { TEnvMapWrapper } from './TEnvMapWrapper';

export type TEnvMapFactory = TReactiveFactory<TEnvMapWrapper, TEnvMapParams> & TParamsFromConfig<TEnvMapConfig, TEnvMapParams> & TDestroyable;
