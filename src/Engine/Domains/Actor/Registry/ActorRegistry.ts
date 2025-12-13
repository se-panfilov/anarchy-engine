import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { IActorRegistry, IActorWrapper } from '@Engine/Domains/Actor';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
