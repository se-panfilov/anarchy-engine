import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@/TransformDrive';
import type { TransformAgent } from '@/TransformDrive/Constants';

export type TAudio3dTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
