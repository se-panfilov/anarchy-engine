import type { TFpsControlsConfigOptions } from './TFpsControlsConfigOptions';
import type { TFpsControlsParams } from './TFpsControlsParams';

export type TFpsControlsConfig = Omit<TFpsControlsParams, 'camera' | 'canvas'> &
  Readonly<{
    options?: TFpsControlsConfigOptions;
    cameraName: string;
  }>;
