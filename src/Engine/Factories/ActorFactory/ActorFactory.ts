import type { IActorFactory, ICreateActorFn } from './Models';
import type { IActorParams } from '@Engine/Models';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { ActorWrapper } from '@Engine/Wrappers';
import { actorAdapter } from '@Engine/Adapters';
import { AbstractFactory } from '../AbstractFactory';

const create: ICreateActorFn = (params: IActorParams): IActorWrapper => ActorWrapper(params);
export const ActorFactory = (): IActorFactory => AbstractFactory('actor', create, actorAdapter);
