import type { TMeters, TRadians } from '@Anarchy/Engine/Math';

export type TTransformAgentPerformanceParams = Readonly<{
  positionNoiseThreshold?: TMeters;
  rotationNoiseThreshold?: TRadians;
}>;
