import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { actorConfigToParams } from '@hellpig/anarchy-engine/Actor/Adapters';
import { Actor } from '@hellpig/anarchy-engine/Actor/Entities';
import type { TActor, TActorFactory, TActorParams, TActorServiceDependencies } from '@hellpig/anarchy-engine/Actor/Models';

export function ActorFactory(): TActorFactory {
  const factory: TReactiveFactory<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactory(FactoryType.Actor, Actor);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: actorConfigToParams });
}
