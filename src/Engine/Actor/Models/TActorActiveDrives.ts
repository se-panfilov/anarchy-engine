import type { ActorDrive } from '@/Engine/Actor/Constants';
import type { TKinematicActorDrive } from '@/Engine/Kinematic';
import type { TPhysicsActorDrive } from '@/Engine/Physics';

export type TActorActiveDrives = Readonly<{
  [ActorDrive.Kinematic]: TKinematicActorDrive;
  [ActorDrive.Physical]: TPhysicsActorDrive;
}>;
