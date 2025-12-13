import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '../Models';
import { ActorWrapper } from '../Wrapper';

const factory: IReactiveFactory<IActorWrapper, IActorParams> = { ...ReactiveFactory(FactoryType.Actor, ActorWrapper) };
export const ActorFactory = (): IActorFactory => ({ ...factory, getParams });
