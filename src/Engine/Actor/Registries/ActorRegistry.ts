import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActorRegistry, TActor } from '@/Engine/Actor/Models';

export const ActorRegistry = (): TActorRegistry => RegistryFacade(AbstractEntityRegistry<TActor>(RegistryType.Actor));
