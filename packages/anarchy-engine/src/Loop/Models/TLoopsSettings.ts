export type TLoopsSettings = TLoopsSettingsSteps & TLoopsSettingsModes;

export type TLoopsSettingsSteps = Readonly<{
  audioLoopStep: number;
  collisionsLoopStep: number;
  controlsLoopStep: number;
  intersectionsLoopStep: number;
  kinematicLoopStep: number;
  mouseLoopStep: number;
  physicsLoopStep: number;
  spatialLoopStep: number;
  textLoopStep: number;
  transformLoopStep: number;
}>;

export type TLoopsSettingsModes = Readonly<{
  isAudioParallel: boolean;
  isCollisionsParallel: boolean;
  isControlsParallel: boolean;
  isIntersectionsParallel: boolean;
  isKinematicParallel: boolean;
  isMouseParallel: boolean;
  isPhysicsParallel: boolean;
  isSpatialParallel: boolean;
  isTextParallel: boolean;
  isTransformParallel: boolean;
}>;
