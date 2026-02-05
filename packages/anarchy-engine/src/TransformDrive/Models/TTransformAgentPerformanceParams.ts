import type { TMeters, TRadians } from '@hellpig/anarchy-engine/Math';

export type TTransformAgentPerformanceParams = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
}>;
