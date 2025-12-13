import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { configToParams } from '@Anarchy/Engine/Actor/Adapters';
import { Actor } from '@Anarchy/Engine/Actor/Entities';
import type { TActor, TActorFactory, TActorParams, TActorServiceDependencies } from '@Anarchy/Engine/Actor/Models';

export function ActorFactory(): TActorFactory {
  const factory: TReactiveFactory<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactory(FactoryType.Actor, Actor);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
