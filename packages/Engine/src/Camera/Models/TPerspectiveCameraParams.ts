import type { TCommonCameraParams } from './TCommonCameraParams';

export type TPerspectiveCameraParams = TCommonCameraParams &
  Readonly<{
    filmGauge?: number;
    filmOffset?: number;
    focus?: number;
    fov?: number;
  }>;
