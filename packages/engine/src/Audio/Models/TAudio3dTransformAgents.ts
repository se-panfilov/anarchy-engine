import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@/Engine/TransformDrive';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TAudio3dTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
