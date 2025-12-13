import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@/TransformDrive';
import type { TransformAgent } from '@/TransformDrive/Constants';

export type TLightTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
