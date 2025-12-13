import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TInstantTransformAgent } from './TInstantTransformAgent';
import type { TKinematicTransformAgent } from './TKinematicTransformAgent';
import type { TPhysicsTransformAgent } from './TPhysicsTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TTransformAgents = Readonly<{
  [TransformAgent.Kinematic]: TKinematicTransformAgent;
  [TransformAgent.Physical]: TPhysicsTransformAgent;
  [TransformAgent.Instant]: TInstantTransformAgent;
}>;

export type TProtectedTransformAgents = Readonly<{
  [TransformAgent.Kinematic]: TProtectedTransformAgentFacade<TKinematicTransformAgent>;
  [TransformAgent.Physical]: TProtectedTransformAgentFacade<TPhysicsTransformAgent>;
  [TransformAgent.Instant]: TProtectedTransformAgentFacade<TInstantTransformAgent>;
}>;
