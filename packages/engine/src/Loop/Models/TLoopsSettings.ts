export type TLoopsSettings = TLoopsSettingsSteps & TLoopsSettingsMode;

export type TLoopsSettingsSteps = Readonly<{
  audioLoopStep: number;
  collisionsLoopStep: number;
  controlsLoopStep: number;
  intersectionsLoopStep: number;
  keyboardLoopStep: number;
  kinematicLoopStep: number;
  mouseLoopStep: number;
  physicsLoopStep: number;
  spatialLoopStep: number;
  textLoopStep: number;
  transformLoopStep: number;
}>;

export type TLoopsSettingsMode = Readonly<{
  isAudioParallel?: boolean;
  isCollisionsParallel?: boolean;
  isControlsParallel?: boolean;
  isIntersectionsParallel?: boolean;
  isKeyboardParallel?: boolean;
  isKinematicParallel?: boolean;
  isMouseParallel?: boolean;
  isPhysicsParallel?: boolean;
  isSpatialParallel?: boolean;
  isTextParallel?: boolean;
  isTransformParallel?: boolean;
}>;
