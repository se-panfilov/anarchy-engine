import type { TCameraRegistry } from '@/Engine/Camera/Models';

import { AbstractCameraRegistry } from './AbstractCameraRegistry';

export const CameraRegistry = (): TCameraRegistry => AbstractCameraRegistry();
