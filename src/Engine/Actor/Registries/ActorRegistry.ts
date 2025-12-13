import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TActor, TActorRegistry } from '@/Engine/Actor/Models';

export const ActorRegistry = (): TActorRegistry => RegistryFacade(AbstractEntityRegistry<TActor>(RegistryType.Actor));
