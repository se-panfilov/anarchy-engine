import { ActorWrapper } from '@Engine/Wrappers/ActorWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { Factory } from '@Engine/Models/Factory';
import type { ActorParams } from '@Engine/Models/ActorParams';

const create = (params: ActorParams): ReturnType<typeof ActorWrapper> => ActorWrapper(params);

export const ActorFactory = (): Factory<ReturnType<typeof ActorWrapper>, ActorParams> => AbstractFactory(create);
