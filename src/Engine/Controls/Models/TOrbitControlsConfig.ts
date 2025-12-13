import type { Vector3Like } from 'three';

import type { ControlsType } from '@/Engine/Controls/Constants';

import type { TOrbitControlsParams } from './TOrbitControlsParams';

export type TOrbitControlsConfig = Omit<TOrbitControlsParams, 'target' | 'cursor' | 'canvas' | 'camera'> &
  Readonly<{
    type: ControlsType;
    cameraName: string;
    target?: Vector3Like;
    cursor?: Vector3Like;
  }>;
