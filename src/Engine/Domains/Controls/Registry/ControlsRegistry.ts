import { AbstractRegistry } from '@Engine/Domains/Abstract';
import { RegistryFacade } from '@Engine/Mixins';
import { RegistryName } from '@Engine/Registries';

import type { IControlsRegistry, IControlsWrapper } from '../Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IControlsWrapper>(RegistryName.Controls));
