import { AbstractRegistry } from './AbstractRegistry';
import type { CameraWrapper } from '@Engine/Wrappers';

export const CameraRegistry = (): ReturnType<typeof AbstractRegistry<ReturnType<typeof CameraWrapper>>> =>
  AbstractRegistry();
