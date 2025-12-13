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

export type TProtectedTransformAgents = Readonly<{
  [TransformAgent.Kinematic]: TProtectedTransformAgentFacade<TKinematicTransformAgent>;
  [TransformAgent.Physical]: TProtectedTransformAgentFacade<TPhysicsTransformAgent>;
  [TransformAgent.Connected]: TProtectedTransformAgentFacade<TConnectedTransformAgent>;
  [TransformAgent.Default]: TProtectedTransformAgentFacade<TDefaultTransformAgent>;
}>;
