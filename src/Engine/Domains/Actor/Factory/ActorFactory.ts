import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import { actorAdapter, ActorWrapper } from '@Engine/Domains/Actor';
import type { IActorFactory, IActorParams, IActorWrapper, ICreateActorFn } from '@Engine/Domains/Actor/Models';

const create: ICreateActorFn = (params: IActorParams): IActorWrapper => ActorWrapper(params);
export const ActorFactory = (): IActorFactory => AbstractFromConfigWrapperFactory('actor', create, actorAdapter);
