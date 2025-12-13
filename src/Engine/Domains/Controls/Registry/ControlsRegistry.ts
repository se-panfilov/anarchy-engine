import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IControlsRegistry, IOrbitControlsWrapper } from '../Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IOrbitControlsWrapper>(RegistryType.Controls));
