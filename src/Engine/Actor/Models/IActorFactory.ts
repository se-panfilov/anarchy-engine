import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { IActorWrapper } from './IActorWrapper';

export type IActorFactory = IReactiveFactory<IActorWrapper, IActorParams> & IParamsFromConfig<IActorConfig, IActorParams> & IDestroyable;
