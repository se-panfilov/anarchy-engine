import type { IAsyncReactiveFactory, ICreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { IActorFactory, IActorParams, IActorWrapperAsync } from '@/Engine/Actor/Models';
import { ActorWrapperAsync } from '@/Engine/Actor/Wrappers';

const factory: IAsyncReactiveFactory<IActorWrapperAsync, IActorParams> = {
  ...AsyncReactiveFactory(FactoryType.Actor, ActorWrapperAsync as ICreateAsyncEntityFactoryFn<IActorWrapperAsync, IActorParams>)
};
export const ActorFactory = (): IActorFactory => ({ ...factory, configToParams });
