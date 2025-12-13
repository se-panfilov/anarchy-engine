import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TProtectedDriverFacade } from '@/Engine/TransformDrive';
import type { ActorDriver } from '@/Engine/TransformDrive/Constants';

export type TWithKinematicProtectedDriver = Readonly<{ [ActorDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver> }>;
