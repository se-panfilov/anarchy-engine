import type { Vector3Like } from 'three';

import type { TOrbitControlsParamsOptions } from './TOrbitControlsParamsOptions';

export type TOrbitControlsConfigOptions = Omit<TOrbitControlsParamsOptions, 'target' | 'cursor'> &
  Readonly<{
    target?: Vector3Like;
    cursor?: Vector3Like;
  }>;
