import type { Vector3Like } from 'three';

import type { Listeners } from '@/Audio';
import type { TObject3DParams, TObject3DPropConfig } from '@/ThreeLib';

import type { TCommonCameraParams } from './TCommonCameraParams';

export type TCommonCameraConfig = Omit<TCommonCameraParams, keyof TObject3DParams | 'lookAt' | 'audioListener' | 'up'> &
  Readonly<{
    lookAt?: Vector3Like;
    audioListener?: Listeners | string;
    up?: Vector3Like;
  }> &
  TObject3DPropConfig;
