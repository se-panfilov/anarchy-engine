import type { Vector3, Vector4 } from 'three';

import type { RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TOptional } from '@/Engine/Utils';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyConfig = Omit<TOptional<TPhysicsBodyParams>, 'type' | 'name' | 'position' | 'rotation'> &
  TOptional<
    Readonly<{
      type: RigidBodyTypesNames;
      position?: Vector3;
      rotation?: Vector4;
    }>
  >;
