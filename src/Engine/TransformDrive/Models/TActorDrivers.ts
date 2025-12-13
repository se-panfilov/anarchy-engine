import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TPhysicsActorDriver } from '@/Engine/Physics';
import type { ActorDriver } from '@/Engine/TransformDrive/Constants';

import type { TInstantActorDriver } from './TInstantActorDriver';
import type { TProtectedDriverFacade } from './TProtectedDriverFacade';

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
