import { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import type { ActorParams, Factory } from '@Engine/Models';

const create = (params: ActorParams): ReturnType<typeof ActorWrapper> => ActorWrapper(params);

export const ActorFactory = (): Factory<ReturnType<typeof ActorWrapper>, ActorParams> => AbstractFactory(create);
