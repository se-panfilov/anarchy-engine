import type { TMeters, TRadians } from '@/Engine/Math';

export type TTransformAgentPerformanceParams = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
}>;
