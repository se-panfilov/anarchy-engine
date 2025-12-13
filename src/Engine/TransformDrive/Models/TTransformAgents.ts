import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TConnectedTransformAgent } from './TConnectedTransformAgent';
import type { TDefaultTransformAgent } from './TDefaultTransformAgent';
import type { TKinematicTransformAgent } from './TKinematicTransformAgent';
import type { TPhysicsTransformAgent } from './TPhysicsTransformAgent';

export type TWithConnectedTransformAgent = Readonly<{ [TransformAgent.Connected]: TConnectedTransformAgent }>;
export type TWithDefaultTransformAgent = Readonly<{ [TransformAgent.Default]: TDefaultTransformAgent }>;
export type TWithKinematicTransformAgent = Readonly<{ [TransformAgent.Kinematic]: TKinematicTransformAgent }>;
export type TWithPhysicsTransformAgent = Readonly<{ [TransformAgent.Physical]: TPhysicsTransformAgent }>;

export type TTransformAgents = TWithDefaultTransformAgent & TWithConnectedTransformAgent & TWithKinematicTransformAgent & TWithPhysicsTransformAgent;
