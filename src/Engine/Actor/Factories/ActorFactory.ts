import type { TCreateEntityFactoryFn, TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { TActorDependencies, TActorFactory, TActorParams, TActorWithPhysicsDependencies, TActorWrapper, TActorWrapperWithPhysics } from '@/Engine/Actor/Models';
import { isBodyServiceDependency } from '@/Engine/Actor/Utils';
import { ActorWrapper, ActorWrapperWithPhysics } from '@/Engine/Actor/Wrappers';
import { isDefined } from '@/Engine/Utils';

function createActor(params: TActorParams, dependencies: TActorDependencies | TActorWithPhysicsDependencies): TActorWrapper | TActorWrapperWithPhysics {
  if (isDefined(params.physics) && isBodyServiceDependency(dependencies)) {
    return ActorWrapperWithPhysics(params, dependencies);
  }
  return ActorWrapper(params, dependencies);
}

const factory: TReactiveFactory<TActorWrapper, TActorParams> = {
  ...ReactiveFactory(FactoryType.Actor, createActor as TCreateEntityFactoryFn<TActorWrapper, TActorParams>)
};
export const ActorFactory = (): TActorFactory => ({ ...factory, configToParams });
