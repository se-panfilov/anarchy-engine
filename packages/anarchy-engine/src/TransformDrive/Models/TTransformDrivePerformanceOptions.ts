import type { TMeters, TRadians } from '@hellpig/anarchy-engine/Math';

export type TTransformDrivePerformanceOptions = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
  scaleNoiseThreshold?: number;
}>;
