import type { TEulerLike } from '@Engine/ThreeLib';
import type { Vector3Like } from 'three';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TPhysicsBodyParams, 'position' | 'rotation' | 'angularVelocity' | 'linearVelocity' | 'enabledRotations' | 'enabledTranslations' | 'massProperties'> &
  Readonly<{
    position: Vector3Like;
    rotation: TEulerLike;
    angularVelocity?: Vector3Like;
    linearVelocity?: Vector3Like;
    // enabledRotations?: Vector3Like;
    // enabledTranslations?: Vector3Like;
  }>;
