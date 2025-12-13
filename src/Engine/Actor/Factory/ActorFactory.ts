import type { IAsyncReactiveFactory } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapter';
import type { IActorFactory, IActorParams, IActorWrapperAsync } from '@/Engine/Actor/Models';
import { ActorWrapperAsync } from '@/Engine/Actor/Wrapper';

const factory: IAsyncReactiveFactory<IActorWrapperAsync, IActorParams> = { ...AsyncReactiveFactory(FactoryType.Actor, ActorWrapperAsync) };
export const ActorFactory = (): IActorFactory => ({ ...factory, configToParams });
