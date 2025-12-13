import type { TMeters, TRadians } from '@/Math';

export type TTransformAgentPerformanceParams = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
}>;
