import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { IActorFactory, IActorParams, IActorWrapper, ICreateActorFn } from '@Engine/Domains/Actor';
import { actorAdapter, ActorWrapper } from '@Engine/Domains/Actor';

const create: ICreateActorFn = (params: IActorParams): IActorWrapper => ActorWrapper(params);
export const ActorFactory = (): IActorFactory => AbstractFromConfigWrapperFactory('actor', create, actorAdapter);
