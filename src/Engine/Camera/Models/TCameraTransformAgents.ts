import type { TConnectedTransformAgent, TDefaultTransformAgent, TProtectedTransformAgentFacade } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TCameraTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;

export type TCameraProtectedTransformAgents = Readonly<{
  [TransformAgent.Connected]: TProtectedTransformAgentFacade<TConnectedTransformAgent>;
  [TransformAgent.Default]: TProtectedTransformAgentFacade<TDefaultTransformAgent>;
}>;
