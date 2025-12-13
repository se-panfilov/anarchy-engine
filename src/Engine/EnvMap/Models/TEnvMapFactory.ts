import type { TAsyncReactiveFactory, TParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TEnvMapConfig } from './TEnvMapConfig';
import type { TEnvMapParams } from './TEnvMapParams';
import type { TEnvMapWrapperAsync } from './TEnvMapWrapperAsync';

export type TEnvMapFactory = TAsyncReactiveFactory<TEnvMapWrapperAsync, TEnvMapParams> & TParamsFromConfig<TEnvMapConfig, TEnvMapParams> & TDestroyable;
