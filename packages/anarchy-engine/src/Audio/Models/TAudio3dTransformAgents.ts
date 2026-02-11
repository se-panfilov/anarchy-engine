import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@Anarchy/Engine/TransformDrive';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';

export type TAudio3dTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
