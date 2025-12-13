import type { TAbstractTransformAgent } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TConnectedTransformAgent } from './TConnectedTransformAgent';
import type { TDefaultTransformAgent } from './TDefaultTransformAgent';
import type { TKinematicTransformAgent } from './TKinematicTransformAgent';
import type { TPhysicsTransformAgent } from './TPhysicsTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TTransformAgents = Readonly<{
  [TransformAgent.Kinematic]: TKinematicTransformAgent;
  [TransformAgent.Physical]: TPhysicsTransformAgent;
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;

export type TProtectedTransformAgents = TWithProtectedTransformAgents<TTransformAgents>;

// TODO 8.0.0. MODELS: extract to TransformDrive mixins (if works, otherwise remove)
export type TWithProtectedTransformAgents<TAgents extends Partial<Record<TransformAgent, TAbstractTransformAgent>>> = Readonly<{
  [K in keyof TAgents]: TProtectedTransformAgentFacade<Extract<TAgents[K], TAbstractTransformAgent>>;
}>;
