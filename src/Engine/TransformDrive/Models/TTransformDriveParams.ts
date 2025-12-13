import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TTransformDriveParams = Readonly<{
  activeAgent: TransformAgent;
  updateDelay: number;
  noiseThreshold: number;
}>;
