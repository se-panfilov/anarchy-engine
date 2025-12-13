import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { TActorDependencies, TActorFactory, TActorParams, TActorWithPhysicsDependencies, TActorWrapperAsync, TActorWrapperWithPhysicsAsync } from '@/Engine/Actor/Models';
import { isBodyServiceDependency } from '@/Engine/Actor/Utils';
import { ActorWrapperAsync, ActorWrapperWithPhysicsAsync } from '@/Engine/Actor/Wrappers';
import { isDefined } from '@/Engine/Utils';

async function createActor(params: TActorParams, dependencies: TActorDependencies | TActorWithPhysicsDependencies): Promise<TActorWrapperAsync | TActorWrapperWithPhysicsAsync> {
  if (isDefined(params.physics) && isBodyServiceDependency(dependencies)) {
    return await ActorWrapperWithPhysicsAsync(params, dependencies);
  }
  return await ActorWrapperAsync(params, dependencies);
}

const factory: TAsyncReactiveFactory<TActorWrapperAsync, TActorParams> = {
  ...AsyncReactiveFactory(FactoryType.Actor, createActor as TCreateAsyncEntityFactoryFn<TActorWrapperAsync, TActorParams>)
};
export const ActorFactory = (): TActorFactory => ({ ...factory, configToParams });
