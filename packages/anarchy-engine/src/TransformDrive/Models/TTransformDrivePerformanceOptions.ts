import type { TMeters, TRadians } from '@Anarchy/Engine/Math';

export type TTransformDrivePerformanceOptions = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
  scaleNoiseThreshold?: number;
}>;
