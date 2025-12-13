import type { TPhysicsTransformAgent, TProtectedTransformAgentFacade } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TWithPhysicsProtectedAgent = Readonly<{ [TransformAgent.Physical]: TProtectedTransformAgentFacade<TPhysicsTransformAgent> }>;
