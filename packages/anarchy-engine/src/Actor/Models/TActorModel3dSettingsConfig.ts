import type { TEulerLike } from '@Anarchy/Engine/ThreeLib';
import type { QuaternionLike, Vector3Like } from 'three';

import type { TActorModel3dSettings } from './TActorModel3dSettings';

export type TActorModel3dSettingsConfig = Omit<TActorModel3dSettings, 'positionOffset' | 'rotationOffset' | 'scaleOffset'> &
  Readonly<{
    positionOffset?: Vector3Like;
    rotationOffset?: QuaternionLike | TEulerLike;
    scaleOffset?: Vector3Like;
  }>;
