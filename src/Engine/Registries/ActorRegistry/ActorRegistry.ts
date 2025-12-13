import { AbstractRegistry } from '../AbstractRegistry';
import type { IActorRegistry } from './Models';
import type { IActorWrapper } from '@Engine/Wrappers';
import { RegistryFacade } from '@Engine/Registries';

export const ActorRegistry = (): IActorRegistry => RegistryFacade(AbstractRegistry<IActorWrapper>());
