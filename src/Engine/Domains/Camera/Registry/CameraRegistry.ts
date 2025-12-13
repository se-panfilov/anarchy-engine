import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Domains/Camera/Models';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractRegistry<ICameraWrapper>(RegistryType.Camera));
