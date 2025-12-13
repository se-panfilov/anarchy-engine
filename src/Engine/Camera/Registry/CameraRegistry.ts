import { RegistryFacade } from '@/Engine/Abstract';
import type { ICameraRegistry } from '@/Engine/Camera/Models';

import { AbstractCameraRegistry } from './AbstractCameraRegistry';

export const CameraRegistry = (): ICameraRegistry => RegistryFacade(AbstractCameraRegistry());
