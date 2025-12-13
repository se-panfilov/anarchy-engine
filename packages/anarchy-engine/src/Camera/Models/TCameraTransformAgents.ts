import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@Anarchy/Engine/TransformDrive';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';

export type TCameraTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
