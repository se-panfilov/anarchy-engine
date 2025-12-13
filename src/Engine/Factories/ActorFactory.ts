import type { ActorParams, Factory } from '@Engine/Models';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import { ActorWrapper } from '@Engine/Wrappers';

const create = (params: ActorParams): ReturnType<typeof ActorWrapper> => ActorWrapper(params);

export const ActorFactory = (): Factory<ReturnType<typeof ActorWrapper>, ActorParams> => AbstractFactory(create);
