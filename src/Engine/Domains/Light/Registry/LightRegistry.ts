import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { ILightRegistry, ILightWrapper } from '../Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>(RegistryType.Light));
