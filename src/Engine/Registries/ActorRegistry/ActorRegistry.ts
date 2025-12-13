import { AbstractRegistry } from '../AbstractRegistry';
import type { IActorRegistry } from './Models';
import { RegistryFacade } from '@Engine/Registries';
import type { IActorWrapper } from '@Engine/Wrappers';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>());
