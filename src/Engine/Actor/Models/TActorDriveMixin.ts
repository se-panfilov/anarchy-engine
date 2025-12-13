import type { BehaviorSubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TKinematicActorDrive } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TPhysicsActorDrive } from '@/Engine/Physics';

export type TActorDriveMixin = Readonly<{
  drive$: BehaviorSubject<ActorDrive>;
  position$: BehaviorSubject<Vector3>;
  rotation$: BehaviorSubject<Euler>;
  scale$: BehaviorSubject<Vector3>;
}> &
  TKinematicActorDrive &
  TPhysicsActorDrive &
  TDestroyable;
