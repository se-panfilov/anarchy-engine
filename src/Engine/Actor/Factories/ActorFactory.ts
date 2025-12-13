import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import { Actor, ActorWithPhysics } from '@/Engine/Actor/Entities';
import type { TActor, TActorDependencies, TActorFactory, TActorParams, TActorServiceDependencies, TActorWithPhysics, TActorWithPhysicsDependencies } from '@/Engine/Actor/Models';
import { isBodyServiceDependency } from '@/Engine/Actor/Utils';
import { isDefined } from '@/Engine/Utils';

function createActor(params: TActorParams, dependencies: TActorDependencies | TActorWithPhysicsDependencies): TActor | TActorWithPhysics {
  if (isDefined(params.physics) && isBodyServiceDependency(dependencies)) {
    return ActorWithPhysics(params, dependencies);
  }
  return Actor(params, dependencies);
}

const factory: TReactiveFactoryWithDependencies<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactoryWithDependencies(FactoryType.Actor, createActor);
export const ActorFactory = (): TActorFactory => ({ ...factory, configToParams });
