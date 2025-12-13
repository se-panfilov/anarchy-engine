import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParams } from '@/Actor/Adapters';
import { Actor } from '@/Actor/Entities';
import type { TActor, TActorFactory, TActorParams, TActorServiceDependencies } from '@/Actor/Models';

export function ActorFactory(): TActorFactory {
  const factory: TReactiveFactory<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactory(FactoryType.Actor, Actor);
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
