import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapter';
import type { IActorFactory, IActorParams, IActorWrapper } from '@/Engine/Actor/Models';
import { ActorWrapper } from '@/Engine/Actor/Wrapper';

const factory: IReactiveFactory<IActorWrapper, IActorParams> = { ...ReactiveFactory(FactoryType.Actor, ActorWrapper) };
export const ActorFactory = (): IActorFactory => ({ ...factory, configToParams });
