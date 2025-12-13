import type { BehaviorSubject, ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

import type { TWithInstantProtectedDriver } from './TWithInstantProtectedDriver';
import type { TWithKinematicProtectedDriver } from './TWithKinematicProtectedDriver';
import type { TWithPhysicsProtectedDriver } from './TWithPhysicsProtectedDriver';

export type TTransformDrive = Readonly<{
  driver$: BehaviorSubject<TransformDriver>;
  position$: ReplaySubject<Vector3>;
  getPosition: () => Vector3;
  rotation$: ReplaySubject<Euler>;
  getRotation: () => Euler;
  scale$: ReplaySubject<Vector3 | undefined>;
  getScale: () => Vector3 | undefined;
}> &
  TWithKinematicProtectedDriver &
  TWithPhysicsProtectedDriver &
  TWithInstantProtectedDriver &
  TDestroyable;
