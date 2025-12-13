import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import { RegistryName } from '@Engine/Registries';

import type { IActorRegistry, IActorWrapper } from '../Models';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
