import type { IAsyncReactiveFactory, IParamsFromConfig } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { IActorWrapper } from './IActorWrapper';

export type IActorFactory = IAsyncReactiveFactory<IActorWrapper, IActorParams> & IParamsFromConfig<IActorConfig, IActorParams> & IDestroyable;
