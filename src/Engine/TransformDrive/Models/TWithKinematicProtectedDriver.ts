import type { TKinematicActorDriver } from '@/Engine/Kinematic';
import type { TProtectedTransformDriverFacade } from '@/Engine/TransformDrive';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TWithKinematicProtectedDriver = Readonly<{ [TransformDriver.Kinematic]: TProtectedTransformDriverFacade<TKinematicActorDriver> }>;
