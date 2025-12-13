import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import type { TActorDependencies, TActorFactory, TActorParams, TActorServiceDependencies, TActorWithPhysicsDependencies, TActorWrapper, TActorWrapperWithPhysics } from '@/Engine/Actor/Models';
import { isBodyServiceDependency } from '@/Engine/Actor/Utils';
import { Actor, ActorWrapperWithPhysics } from '@/Engine/Actor/Wrappers';
import { isDefined } from '@/Engine/Utils';

function createActor(params: TActorParams, dependencies: TActorDependencies | TActorWithPhysicsDependencies): TActorWrapper | TActorWrapperWithPhysics {
  if (isDefined(params.physics) && isBodyServiceDependency(dependencies)) {
    return ActorWrapperWithPhysics(params, dependencies);
  }
  return Actor(params, dependencies);
}

const factory: TReactiveFactoryWithDependencies<TActorWrapper, TActorParams, TActorServiceDependencies> = ReactiveFactoryWithDependencies(FactoryType.Actor, createActor);
export const ActorFactory = (): TActorFactory => ({ ...factory, configToParams });
