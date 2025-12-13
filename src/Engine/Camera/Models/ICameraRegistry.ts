import type { IProtectedRegistry } from '@/Engine/Abstract';

import type { IAbstractCameraRegistry } from './IAbstractCameraRegistry';

export type ICameraRegistry = IProtectedRegistry<IAbstractCameraRegistry>;
