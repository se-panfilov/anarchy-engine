import { RegistryFacade } from '@/Engine/Abstract/Registry';
import type { ICameraRegistry } from '@/Engine/Camera/Models';

import { AbstractCameraRegistry } from './AbstractCameraRegistry';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractCameraRegistry());
