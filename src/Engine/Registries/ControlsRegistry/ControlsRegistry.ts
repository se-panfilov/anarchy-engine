import { AbstractRegistry } from '../AbstractRegistry';
import type { IControlsRegistry } from './Models';
import { RegistryFacade } from '@Engine/Registries';
import type { IControlsWrapper } from '@Engine/Wrappers';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IControlsWrapper>());
