import { actorAdapter } from '@Engine/Adapters';
import type { IActorParams } from '@Engine/Models';
import { ActorWrapper } from '@Engine/Wrappers';
import type { IActorWrapper } from '@Engine/Wrappers/ActorWrapper';

import { AbstractFactory } from '../AbstractFactory';
import type { IActorFactory, ICreateActorFn } from './Models';

const create: ICreateActorFn = (params: IActorParams): IActorWrapper => ActorWrapper(params);
export const ActorFactory = (): IActorFactory => AbstractFactory('actor', create, actorAdapter);
