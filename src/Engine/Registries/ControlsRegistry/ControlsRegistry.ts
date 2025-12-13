import { RegistryFacade, RegistryName } from '@Engine/Registries';
import type { IControlsWrapper } from '@Engine/Wrappers';

import { AbstractRegistry } from '../AbstractRegistry';
import type { IControlsRegistry } from './Models';

export const ControlsRegistry = (): IControlsRegistry =>
  RegistryFacade(AbstractRegistry<IControlsWrapper>(RegistryName.Controls));
