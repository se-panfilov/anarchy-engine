import { RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TCameraRegistry } from '@/Engine/Camera/Models';

import { AbstractCameraRegistry } from './AbstractCameraRegistry';

export const CameraRegistry = (): TCameraRegistry => RegistryFacade(AbstractCameraRegistry());
