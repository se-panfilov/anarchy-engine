import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@/TransformDrive';
import type { TransformAgent } from '@/TransformDrive/Constants';

export type TCameraTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
