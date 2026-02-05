import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@hellpig/anarchy-engine/TransformDrive';
import type { TransformAgent } from '@hellpig/anarchy-engine/TransformDrive/Constants';

export type TCameraTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
