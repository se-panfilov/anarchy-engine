import type { TCommonCameraConfig } from './TCommonCameraConfig';

export type TPerspectiveCameraConfig = TCommonCameraConfig & TPerspectiveCameraOnlyConfig;

export type TPerspectiveCameraOnlyConfig = Readonly<{
  filmGauge?: number;
  filmOffset?: number;
  focus?: number;
  fov?: number;
}>;
