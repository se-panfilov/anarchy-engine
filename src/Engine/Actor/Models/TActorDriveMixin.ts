import type { BehaviorSubject, Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TKinematicDrive } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';

export type TActorDriveMixin = Readonly<{
  drive$: BehaviorSubject<ActorDrive>;
  position$: Observable<Vector3>;
  rotation$: Observable<Euler>;
  scale$: Observable<Vector3>;
}> &
  TKinematicDrive &
  TDestroyable;
