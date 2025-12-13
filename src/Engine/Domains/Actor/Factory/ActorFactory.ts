import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import { actorAdapter } from '../Adapter';
import type { IActorFactory, IActorParams, IActorWrapper, ICreateActorFn } from '../Models';
import { ActorWrapper } from '../Wrapper';

const create: ICreateActorFn = (params: IActorParams): IActorWrapper => ActorWrapper(params);
export const ActorFactory = (): IActorFactory => AbstractFromConfigWrapperFactory('actor', create, actorAdapter);
