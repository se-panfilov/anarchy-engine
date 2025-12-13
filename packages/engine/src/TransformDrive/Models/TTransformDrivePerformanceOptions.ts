import type { TMeters, TRadians } from '@Engine/Math';

export type TTransformDrivePerformanceOptions = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
  scaleNoiseThreshold?: number;
}>;
