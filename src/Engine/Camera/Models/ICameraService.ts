import type { IDestroyable } from '@/Engine/Mixins';

import type { ICameraRegistry } from './ICameraRegistry';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = Readonly<{
  setActiveCamera: (cameraId: string, cameraRegistry: ICameraRegistry) => void;
  getActiveCamera: (cameraRegistry: ICameraRegistry) => ICameraWrapper | undefined;
}> &
  IDestroyable;
