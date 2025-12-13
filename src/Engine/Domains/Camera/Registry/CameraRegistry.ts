import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { ICameraRegistry, ICameraWrapper } from '../Models';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractRegistry<ICameraWrapper>(RegistryType.Camera));
