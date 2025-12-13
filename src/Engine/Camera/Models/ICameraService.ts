import type { ICameraRegistry } from './ICameraRegistry';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraService = {
  setActiveCamera: (cameraId: string, cameraRegistry: ICameraRegistry) => void;
  getActiveCamera: (cameraRegistry: ICameraRegistry) => ICameraWrapper | undefined;
};
