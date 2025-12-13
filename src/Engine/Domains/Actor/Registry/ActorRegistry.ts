import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IActorRegistry, IActorWrapper } from '../Models';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryType.Actor));
