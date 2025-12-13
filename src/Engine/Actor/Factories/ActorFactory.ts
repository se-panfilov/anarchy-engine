import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import { Actor } from '@/Engine/Actor/Entities';
import type { TActor, TActorFactory, TActorParams, TActorServiceDependencies } from '@/Engine/Actor/Models';

// TODO 8.0.0. MODELS: remove (use PhysicsTransformAgent instead)
// function createActor(params: TActorParams, dependencies: TActorDependencies | TActorWithPhysicsDependencies): TActor | TActorWithPhysics {
//   if (isDefined(params.physics) && isBodyServiceDependency(dependencies)) {
//     return ActorWithPhysics(params, dependencies);
//   }
//   return Actor(params, dependencies);
// }

const factory: TReactiveFactoryWithDependencies<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactoryWithDependencies(FactoryType.Actor, Actor);
export const ActorFactory = (): TActorFactory => ({ ...factory, configToParams });
