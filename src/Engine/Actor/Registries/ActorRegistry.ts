import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActorRegistry, TActorWrapper } from '@/Engine/Actor/Models';

export const ActorRegistry = (): TActorRegistry => RegistryFacade(AbstractEntityRegistry<TActorWrapper>(RegistryType.Actor));
