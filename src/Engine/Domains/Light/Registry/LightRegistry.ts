import { RegistryFacade, RegistryName } from '@Engine/Registries';
import type { ILightWrapper } from '@Engine/Wrappers';

import { AbstractRegistry } from '../AbstractRegistry';
import type { ILightRegistry } from './Models';

export const LightRegistry = (): ILightRegistry => RegistryFacade(AbstractRegistry<ILightWrapper>(RegistryName.Light));
