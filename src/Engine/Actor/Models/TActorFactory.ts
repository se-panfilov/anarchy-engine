import type { TAsyncReactiveFactory, TParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TActorConfig } from './TActorConfig';
import type { TActorParams } from './TActorParams';
import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type TActorFactory = TAsyncReactiveFactory<TActorWrapperAsync, TActorParams> & TParamsFromConfig<TActorConfig, TActorParams> & TDestroyable;
