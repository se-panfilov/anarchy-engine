import type { IActorFactory, ICreateActorFn } from './Models';
import type { ActorParams } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers';
import { ActorWrapper } from '@Engine/Wrappers';
import { actorAdapter } from '@Engine/Adapters';
import { AbstractFactory } from '../AbstractFactory';

const create: ICreateActorFn = (params: ActorParams): IActorWrapper => ActorWrapper(params);
export const ActorFactory = (): IActorFactory => AbstractFactory('actor', create, actorAdapter);
