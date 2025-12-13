import type { TConnectedTransformAgent, TDefaultTransformAgent, TProtectedTransformAgentFacade } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TLightTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;

export type TLightProtectedTransformAgents = Readonly<{
  [TransformAgent.Connected]: TProtectedTransformAgentFacade<TConnectedTransformAgent>;
  [TransformAgent.Default]: TProtectedTransformAgentFacade<TDefaultTransformAgent>;
}>;
