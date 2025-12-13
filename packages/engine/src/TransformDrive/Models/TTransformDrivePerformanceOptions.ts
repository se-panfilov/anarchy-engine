import type { TMeters, TRadians } from '@/Math';

export type TTransformDrivePerformanceOptions = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
  scaleNoiseThreshold?: number;
}>;
