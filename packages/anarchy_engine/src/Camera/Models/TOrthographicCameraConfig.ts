import type { TCommonCameraConfig } from './TCommonCameraConfig';

export type TOrthographicCameraConfig = TCommonCameraConfig & TOrthographicCameraOnlyConfig;

export type TOrthographicCameraOnlyConfig = Readonly<{
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}>;
