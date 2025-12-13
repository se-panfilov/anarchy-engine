import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TPhysicsActorDriver } from '@/Engine/Physics';

export type TActorActiveDrivers = Readonly<{
  [ActorDriver.Kinematic]: TKinematicActorDriver;
  [ActorDriver.Physical]: TPhysicsActorDriver;
}>;
