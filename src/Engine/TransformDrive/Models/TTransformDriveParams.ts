import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TTransformDriveParams = Readonly<{
  activeDriver: TransformDriver;
  updateDelay: number;
  noiseThreshold: number;
}>;
