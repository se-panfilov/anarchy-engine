import type { BehaviorSubject, ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TProtectedDriverFacade } from '@/Engine/Abstract';
import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TPhysicsActorDriver } from '@/Engine/Physics';

export type TActorDriveMixin = Readonly<{
  driver$: BehaviorSubject<ActorDriver>;
  position$: ReplaySubject<Vector3>;
  getPosition: () => Vector3;
  rotation$: ReplaySubject<Euler>;
  getRotation: () => Euler;
  scale$: ReplaySubject<Vector3 | undefined>;
  getScale: () => Vector3 | undefined;
  [ActorDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver>;
  [ActorDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver>;
}> &
  TDestroyable;
