import type { TAsyncReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TActorParams } from './TActorParams';
import type { TActorWrapperAsync } from './TActorWrapperAsync';
import type { TParamsFromConfigAsyncActor } from './TParamsFromConfigAsyncActor';

export type TActorFactory = TAsyncReactiveFactory<TActorWrapperAsync, TActorParams> & TParamsFromConfigAsyncActor & TDestroyable;
