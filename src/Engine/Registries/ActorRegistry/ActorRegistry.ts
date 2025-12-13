import { RegistryFacade, RegistryName } from '@Engine/Registries';
import type { IActorWrapper } from '@Engine/Wrappers';

import { AbstractRegistry } from '../AbstractRegistry';
import type { IActorRegistry } from './Models';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>(RegistryName.Actor));
