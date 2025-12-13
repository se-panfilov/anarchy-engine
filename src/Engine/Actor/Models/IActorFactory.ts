import type { IAsyncReactiveFactory, IParamsFromConfig } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { IActorWrapperAsync } from './IActorWrapperAsync';

export type IActorFactory = IAsyncReactiveFactory<IActorWrapperAsync, IActorParams> & IParamsFromConfig<IActorConfig, IActorParams> & IDestroyable;
