import type { TAsyncReactiveFactory, TParamsFromConfigAsync } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TEnvMapConfigPack } from './TEnvMapConfigPack';
import type { TEnvMapParamsPack } from './TEnvMapParamsPack';
import type { TEnvMapWrapperAsync } from './TEnvMapWrapperAsync';

export type TEnvMapFactory = TAsyncReactiveFactory<TEnvMapWrapperAsync, TEnvMapParamsPack> & TParamsFromConfigAsync<TEnvMapConfigPack, TEnvMapParamsPack> & TDestroyable;
