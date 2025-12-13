import type { TProtectedDriverFacade } from '@/Engine/Abstract';
import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TPhysicsActorDriver } from '@/Engine/Physics';

import type { TInstantActorDriver } from './TInstantActorDriver';

export type TActorDrivers = Readonly<{
  [ActorDriver.Kinematic]: TKinematicActorDriver;
  [ActorDriver.Physical]: TPhysicsActorDriver;
  [ActorDriver.Instant]: TInstantActorDriver;
}>;

export type TProtectedActorDrivers = Readonly<{
  [ActorDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver>;
  [ActorDriver.Physical]: TProtectedDriverFacade<TPhysicsActorDriver>;
  [ActorDriver.Instant]: TProtectedDriverFacade<TInstantActorDriver>;
}>;
