import { AbstractRegistry, RegistryFacade, RegistryName } from '@Engine/Registries';
import type { IActorRegistry, IActorWrapper } from '@Engine/Domains/Actor/Models';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
