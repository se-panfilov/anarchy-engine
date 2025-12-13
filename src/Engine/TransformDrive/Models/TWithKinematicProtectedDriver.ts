import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TProtectedDriverFacade } from '@/Engine/TransformDrive';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TWithKinematicProtectedDriver = Readonly<{ [TransformDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver> }>;
