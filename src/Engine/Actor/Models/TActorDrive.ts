import type { BehaviorSubject, ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TWithInstantProtectedDriver, TWithKinematicProtectedDriver, TWithPhysicsProtectedDriver } from '@/Engine/Abstract';
import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TDestroyable } from '@/Engine/Mixins';

export type TActorDrive = Readonly<{
  driver$: BehaviorSubject<ActorDriver>;
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
