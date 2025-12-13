import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { IActorFactory, IActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import { ActorWrapperAsync } from '@/Engine/Actor/Wrappers';

const factory: TAsyncReactiveFactory<TActorWrapperAsync, IActorParams> = {
  ...AsyncReactiveFactory(FactoryType.Actor, ActorWrapperAsync as TCreateAsyncEntityFactoryFn<TActorWrapperAsync, IActorParams>)
};
export const ActorFactory = (): IActorFactory => ({ ...factory, configToParams });
