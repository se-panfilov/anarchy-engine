import type { Vector3Like } from 'three';

import type { TEulerLike } from '@/Engine/ThreeLib';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TPhysicsBodyParams, 'position' | 'rotation' | 'angularVelocity' | 'linearVelocity'> &
  Readonly<{
    position: Vector3Like;
    rotation: TEulerLike;
    angularVelocity?: Vector3Like;
    linearVelocity?: Vector3Like;
  }>;
