import type { Vector3Like } from 'three';

import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TCameraParams } from './TCameraParams';

export type TCameraConfig = Omit<TCameraParams, keyof TObject3DParams | 'lookAt'> &
  Readonly<{
    lookAt?: Vector3Like;
  }> &
  TObject3DPropConfig;
