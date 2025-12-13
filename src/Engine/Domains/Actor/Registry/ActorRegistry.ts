import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { IActorRegistry, IActorWrapper } from '../Models';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
