import type { AbstractRegistry } from '@Engine/Registries';
import type { CameraWrapper } from '@Engine/Wrappers';

export type ICameraRegistry = ReturnType<typeof AbstractRegistry<ReturnType<typeof CameraWrapper>>>;
