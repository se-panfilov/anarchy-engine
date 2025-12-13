import type { Vector3Like } from 'three';

import type { Listeners } from '@/Engine/Audio';
import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TCameraParams } from './TCameraParams';

export type TCameraConfig = Omit<TCameraParams, keyof TObject3DParams | 'lookAt' | 'audioListener' | 'layers'> &
  Readonly<{
    lookAt?: Vector3Like;
    audioListener?: Listeners | string;
    layers?: number;
  }> &
  TObject3DPropConfig;
