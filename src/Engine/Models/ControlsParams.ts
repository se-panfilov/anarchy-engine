import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';

export interface ControlsParams {
  readonly camera: ReturnType<typeof CameraWrapper>;
  readonly domElement: HTMLCanvasElement;
}
