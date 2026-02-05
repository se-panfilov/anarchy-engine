import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@hellpig/anarchy-engine/TransformDrive';
import type { TransformAgent } from '@hellpig/anarchy-engine/TransformDrive/Constants';

export type TAudio3dTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
