import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Actor/Adapters';
import { Actor } from '@/Engine/Actor/Entities';
import type { TActor, TActorFactory, TActorParams, TActorServiceDependencies } from '@/Engine/Actor/Models';

const factory: TReactiveFactory<TActor, TActorParams, TActorServiceDependencies> = ReactiveFactory(FactoryType.Actor, Actor);
// eslint-disable-next-line functional/immutable-data
export const ActorFactory = (): TActorFactory => Object.assign(factory, { configToParams });
