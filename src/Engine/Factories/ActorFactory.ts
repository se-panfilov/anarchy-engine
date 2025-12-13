import type { ActorParams, Factory } from '@Engine/Models';
import { AbstractFactory, CreateFN } from './AbstractFactory';
import { ActorWrapper, IActorWrapper } from '@Engine/Wrappers';
import { actorAdapter } from '@Engine/Adapters';
import type { Mesh } from 'three';

const create: CreateFN<ReturnType<typeof ActorWrapper>, ActorParams> = (
  params: ActorParams
): ReturnType<typeof ActorWrapper> => ActorWrapper(params);

export const ActorFactory = (): Factory<IActorWrapper, Mesh, ActorParams> =>
  AbstractFactory('actor', create, actorAdapter);
