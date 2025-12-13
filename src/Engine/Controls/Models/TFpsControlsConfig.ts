import type { TFpsControlsParams } from './TFpsControlsParams';

export type TFpsControlsConfig = Omit<TFpsControlsParams, 'camera'> &
  Readonly<{
    cameraName: string;
  }>;
