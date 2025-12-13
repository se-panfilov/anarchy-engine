import type { ActorParams, Factory } from '@Engine/Models';
import { AbstractFactory } from './AbstractFactory';
import { ActorWrapper } from '@Engine/Wrappers';
import { actorAdapter } from '@Engine/Launcher/ConfigToParamAdapters';

const create = (params: ActorParams): ReturnType<typeof ActorWrapper> => ActorWrapper(params);

export const ActorFactory = (): Factory<ReturnType<typeof ActorWrapper>, ActorParams> =>
  AbstractFactory('actor', create, actorAdapter);
