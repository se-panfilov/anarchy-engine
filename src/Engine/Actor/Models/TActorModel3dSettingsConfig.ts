import type { QuaternionLike } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { TEulerLike } from '@/Engine/ThreeLib';

import type { TActorModel3dSettings } from './TActorModel3dSettings';

export type TActorModel3dSettingsConfig = Omit<TActorModel3dSettings, 'positionOffset' | 'rotationOffset' | 'scaleOffset'> &
  Readonly<{
    positionOffset?: Vector3Like;
    rotationOffset?: QuaternionLike | TEulerLike;
    scaleOffset?: Vector3Like;
  }>;
