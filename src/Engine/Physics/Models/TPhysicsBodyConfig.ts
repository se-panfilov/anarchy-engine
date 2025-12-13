import type { QuaternionLike, Vector3Like } from 'three';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TPhysicsBodyParams, 'position' | 'rotation'> &
  Readonly<{
    position?: Vector3Like;
    rotation?: QuaternionLike;
  }>;
