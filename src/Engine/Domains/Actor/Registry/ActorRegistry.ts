import { AbstractRegistry } from '@Engine/Domains/Abstract';
import type { IActorRegistry, IActorWrapper } from '@Engine/Domains/Actor/Models';
import { RegistryFacade, RegistryName } from '@Engine/Registries';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
