import type { IActorRegistry, IActorWrapper } from '@Engine/Domains/Actor/Models';
import { AbstractRegistry, RegistryFacade, RegistryName } from '@Engine/Registries';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
