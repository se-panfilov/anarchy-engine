import type { CameraWrapper } from '@Engine/Wrappers';

export interface ControlsParams {
  readonly camera: ReturnType<typeof CameraWrapper>;
  readonly domElement: HTMLCanvasElement;
}
