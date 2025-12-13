import type { Vector3Like } from 'three/src/math/Vector3';

import type { TOrbitControlsParams } from './TOrbitControlsParams';

export type TOrbitControlsConfig = Omit<TOrbitControlsParams, 'target' | 'cursor' | 'canvas' | 'camera'> &
  Readonly<{
    cameraName: string;
    target?: Vector3Like;
    cursor?: Vector3Like;
  }>;
