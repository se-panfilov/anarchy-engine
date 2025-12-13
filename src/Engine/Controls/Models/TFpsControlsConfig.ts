import type { TFpsControlsParams } from './TFpsControlsParams';

export type TFpsControlsConfig = Omit<TFpsControlsParams, 'camera' | 'canvas'> &
  Readonly<{
    cameraName: string;
  }>;
