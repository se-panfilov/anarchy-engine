import type { IFactory, IParamsFromConfig } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IActorConfig } from './IActorConfig';
import type { IActorParams } from './IActorParams';
import type { IActorWrapper } from './IActorWrapper';

export type IActorFactory = IFactory<IActorWrapper, IActorParams> & IParamsFromConfig<IActorConfig, IActorParams> & IDestroyable;
