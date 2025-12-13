import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { TActorFactory, TActorParams, TActorWrapperAsync } from '@/Engine/Actor/Models';
import { ActorWrapperAsync } from '@/Engine/Actor/Wrappers';

const factory: TAsyncReactiveFactory<TActorWrapperAsync, TActorParams> = {
  ...AsyncReactiveFactory(FactoryType.Actor, ActorWrapperAsync as TCreateAsyncEntityFactoryFn<TActorWrapperAsync, TActorParams>)
};
export const ActorFactory = (): TActorFactory => ({ ...factory, configToParams });
