import type { TConnectedTransformAgent, TDefaultTransformAgent, TProtectedTransformAgentFacade } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TParticlesTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;

export type TParticlesProtectedTransformAgents = Readonly<{
  [TransformAgent.Connected]: TProtectedTransformAgentFacade<TConnectedTransformAgent>;
  [TransformAgent.Default]: TProtectedTransformAgentFacade<TDefaultTransformAgent>;
}>;
