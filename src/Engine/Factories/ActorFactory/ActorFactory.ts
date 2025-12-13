import type { ActorParams } from '@Engine/Models';
import { ActorWrapper } from '@Engine/Wrappers';
import { actorAdapter } from '@Engine/Adapters';
import { AbstractFactory } from '../AbstractFactory';
import type { ICreateActorFn } from './Models';
import { IActorFactory } from '@Engine/Factories/ActorFactory/Models/IActorFactory';

const create: ICreateActorFn = (params: ActorParams): ReturnType<typeof ActorWrapper> => ActorWrapper(params);

export const ActorFactory = (): IActorFactory => AbstractFactory('actor', create, actorAdapter);
