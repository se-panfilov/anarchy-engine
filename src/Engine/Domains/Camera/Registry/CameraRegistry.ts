import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { ICameraRegistry, ICameraWrapper } from '../Models';

export const CameraRegistry = (): ICameraRegistry => AbstractRegistry<ICameraWrapper>(RegistryName.Camera);
