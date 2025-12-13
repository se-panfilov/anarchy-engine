import type { Vector3Like } from 'three';

import type { TOrbitControlsConfigOptions } from './TOrbitControlsConfigOptions';
import type { TOrbitControlsParams } from './TOrbitControlsParams';

export type TOrbitControlsConfig = Omit<TOrbitControlsParams, 'options' | 'canvas' | 'camera'> &
  Readonly<{
    options?: TOrbitControlsConfigOptions;
    cameraName: string;
    target?: Vector3Like;
    cursor?: Vector3Like;
  }>;
