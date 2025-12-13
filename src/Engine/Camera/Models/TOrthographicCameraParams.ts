import type { TCommonCameraParams } from './TCommonCameraParams';

export type TOrthographicCameraParams = TCommonCameraParams &
  Readonly<{
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  }>;
