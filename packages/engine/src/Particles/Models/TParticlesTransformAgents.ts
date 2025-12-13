import type { TConnectedTransformAgent, TDefaultTransformAgent } from '@/TransformDrive';
import type { TransformAgent } from '@/TransformDrive/Constants';

export type TParticlesTransformAgents = Readonly<{
  [TransformAgent.Connected]: TConnectedTransformAgent;
  [TransformAgent.Default]: TDefaultTransformAgent;
}>;
