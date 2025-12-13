import type { BehaviorSubject, ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TWithDefaultProtectedAgent } from './TWithDefaultProtectedAgent';
import type { TWithInstantProtectedAgent } from './TWithInstantProtectedAgent';
import type { TWithKinematicProtectedAgent } from './TWithKinematicProtectedAgent';
import type { TWithPhysicsProtectedAgent } from './TWithPhysicsProtectedAgent';

export type TTransformDrive = Readonly<{
  agent$: BehaviorSubject<TransformAgent>;
  position$: ReplaySubject<Vector3>;
  getPosition: () => Vector3;
  rotation$: ReplaySubject<Euler>;
  getRotation: () => Euler;
  scale$: ReplaySubject<Vector3>;
  getScale: () => Vector3;
}> &
  TWithKinematicProtectedAgent &
  TWithPhysicsProtectedAgent &
  TWithInstantProtectedAgent &
  TWithDefaultProtectedAgent &
  TDestroyable;
