import type { Listeners } from '@hellpig/anarchy-engine/Audio';
import type { TObject3DParams, TObject3DPropConfig } from '@hellpig/anarchy-engine/ThreeLib';
import type { Vector3Like } from 'three';

import type { TCommonCameraParams } from './TCommonCameraParams';

export type TCommonCameraConfig = Omit<TCommonCameraParams, keyof TObject3DParams | 'lookAt' | 'audioListener' | 'up'> &
  Readonly<{
    lookAt?: Vector3Like;
    audioListener?: Listeners | string;
    up?: Vector3Like;
  }> &
  TObject3DPropConfig;
