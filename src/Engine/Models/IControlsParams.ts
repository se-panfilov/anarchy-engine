import type { CameraWrapper } from '@Engine/Wrappers';

export interface IControlsParams {
  readonly camera: ReturnType<typeof CameraWrapper>;
  readonly domElement: HTMLCanvasElement;
}
