import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraFactory } from './ICameraFactory';
import type { ICameraParams } from './ICameraParams';
import type { ICameraRegistry } from './ICameraRegistry';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = Readonly<{
  create: (params: ICameraParams) => ICameraWrapper;
  createFromConfig: (cameras: ReadonlyArray<ICameraConfig>) => void;
  setActiveCamera: (cameraId: string) => void;
  findActiveCamera: () => ICameraWrapper | undefined;
  startUpdatingCamerasAspect: (isOnlyActive: boolean) => void;
  getFactory: () => ICameraFactory;
  getRegistry: () => ICameraRegistry;
  getScene: () => ISceneWrapper;
}> &
  IDestroyable;
