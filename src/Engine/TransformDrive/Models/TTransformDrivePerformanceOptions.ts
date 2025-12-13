export type TTransformDrivePerformanceOptions = Readonly<{
  updatePositionDelay?: number;
  updateRotationDelay?: number;
  updateScaleDelay?: number;
  positionNoiseThreshold?: number;
  rotationNoiseThreshold?: number;
  scaleNoiseThreshold?: number;
}>;
