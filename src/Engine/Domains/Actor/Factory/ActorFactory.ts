import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Domains/Abstract';
import { getParams } from '@/Engine/Domains/Actor/Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '@/Engine/Domains/Actor/Models';
import { ActorWrapper } from '@/Engine/Domains/Actor/Wrapper';

const factory: IReactiveFactory<IActorWrapper, IActorParams> = { ...ReactiveFactory(FactoryType.Actor, ActorWrapper) };
export const ActorFactory = (): IActorFactory => ({ ...factory, getParams });
