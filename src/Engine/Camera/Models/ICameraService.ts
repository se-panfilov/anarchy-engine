import type { IDestroyable } from '@/Engine/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraRegistry } from './ICameraRegistry';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = Readonly<{
  create: (params: ICameraParams) => ICameraWrapper;
  createFromConfig: (cameras: ReadonlyArray<ICameraConfig>) => void;
  setActiveCamera: (cameraId: string) => void;
  findActiveCamera: (cameraRegistry: ICameraRegistry) => ICameraWrapper | undefined;
}> &
  IDestroyable;
