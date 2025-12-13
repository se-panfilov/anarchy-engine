import type { TransformAgent } from '@/TransformDrive/Constants';

import type { TTransformDrivePerformanceOptions } from './TTransformDrivePerformanceOptions';

export type TTransformDriveParams = Readonly<{
  relatedEntityId: string;
  activeAgent?: TransformAgent;
  performance?: TTransformDrivePerformanceOptions;
}>;
