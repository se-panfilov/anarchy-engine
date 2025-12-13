import type { TAsyncReactiveFactory, IParamsFromConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { TActorWrapperAsync } from './TActorWrapperAsync';

export type IActorFactory = TAsyncReactiveFactory<TActorWrapperAsync, IActorParams> & IParamsFromConfig<IActorConfig, IActorParams> & TDestroyable;
