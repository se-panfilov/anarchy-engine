import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TTransformDrivePerformanceOptions } from './TTransformDrivePerformanceOptions';

export type TTransformDriveParams = Readonly<{
  activeAgent?: TransformAgent;
  updateDelay?: number;
  noiseThreshold?: number;
  performance?: TTransformDrivePerformanceOptions;
}>;
