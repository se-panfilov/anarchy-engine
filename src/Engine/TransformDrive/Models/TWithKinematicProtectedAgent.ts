import type { TKinematicTransformAgent, TProtectedTransformAgentFacade } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TWithKinematicProtectedAgent = Readonly<{ [TransformAgent.Kinematic]: TProtectedTransformAgentFacade<TKinematicTransformAgent> }>;
