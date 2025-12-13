import type { BehaviorSubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TProtectedDriverFacade } from '@/Engine/Abstract';
import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TPhysicsActorDriver } from '@/Engine/Physics';

export type TActorDriveMixin = Readonly<{
  driver$: BehaviorSubject<ActorDriver>;
  position$: BehaviorSubject<Vector3>;
  rotation$: BehaviorSubject<Euler>;
  scale$: BehaviorSubject<Vector3 | undefined>;
  [ActorDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver>;
  [ActorDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver>;
}> &
  TDestroyable;
