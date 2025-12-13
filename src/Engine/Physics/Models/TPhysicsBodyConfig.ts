import type { QuaternionLike } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

import type { RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TOptional<TPhysicsBodyParams>, 'type' | 'name' | 'position' | 'rotation'> &
  TOptional<
    Readonly<{
      type: RigidBodyTypesNames;
      position?: Vector3Like;
      rotation?: QuaternionLike;
    }>
  >;
