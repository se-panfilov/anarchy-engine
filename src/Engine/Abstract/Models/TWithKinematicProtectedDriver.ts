import type { TProtectedDriverFacade } from '@/Engine/Abstract';
import type { ActorDriver } from '@/Engine/Actor/Constants';
import type { TKinematicActorDriver } from '@/Engine/Kinematic';

export type TWithKinematicProtectedDriver = Readonly<{ [ActorDriver.Kinematic]: TProtectedDriverFacade<TKinematicActorDriver> }>;
