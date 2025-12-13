import type { IDestroyable } from '@/Engine/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = Readonly<{
  create: (params: ICameraParams) => ICameraWrapper;
  createFromConfig: (cameras: ReadonlyArray<ICameraConfig>) => void;
  setActiveCamera: (cameraId: string) => void;
  findActiveCamera: () => ICameraWrapper | undefined;
  startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
}> &
  IDestroyable;
