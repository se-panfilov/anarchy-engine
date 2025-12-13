import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsActorAdapter } from '@/Engine/Actor/Adapters';
import { Actor } from '@/Engine/Actor/Entities';
import type { TActor, TActorFactory, TActorParams, TActorServiceDependencies } from '@/Engine/Actor/Models';

export function ActorFactory(): TActorFactory {
  const factory: TReactiveFactory<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactory(FactoryType.Actor, Actor);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: configToParamsActorAdapter });
}
