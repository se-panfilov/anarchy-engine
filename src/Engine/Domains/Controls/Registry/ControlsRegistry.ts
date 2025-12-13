import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { IControlsRegistry, IOrbitControlsWrapper } from '../Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IOrbitControlsWrapper>(RegistryName.Controls));
