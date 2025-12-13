import type { TLoopsSettings, TLoopsSettingsModes, TLoopsSettingsSteps } from '@Anarchy/Engine/Loop/Models';
import { mergeAll } from '@Anarchy/Engine/Utils';

export const LOOPS_DEFAULT_STEPS: TLoopsSettingsSteps = {
  audioLoopStep: 16,
  collisionsLoopStep: 16,
  controlsLoopStep: 16,
  intersectionsLoopStep: 16,
  kinematicLoopStep: 16,
  mouseLoopStep: 16,
  physicsLoopStep: 16,
  spatialLoopStep: 16,
  textLoopStep: 16,
  transformLoopStep: 16
};

export const LOOPS_MODES: TLoopsSettingsModes = {
  isAudioParallel: false,
  isCollisionsParallel: false,
  isControlsParallel: false,
  isIntersectionsParallel: false,
  isKinematicParallel: false,
  isMouseParallel: false,
  isPhysicsParallel: false,
  isSpatialParallel: false,
  isTextParallel: false,
  isTransformParallel: false
};

export const LOOPS_DEFAULT_SETTINGS: TLoopsSettings = mergeAll(LOOPS_DEFAULT_STEPS, LOOPS_MODES);
