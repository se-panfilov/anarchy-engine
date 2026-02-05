import type { TAudioLoop } from '@hellpig/anarchy-engine/Audio';
import type { TCollisionsLoop } from '@hellpig/anarchy-engine/Collisions';
import type { TControlsLoop } from '@hellpig/anarchy-engine/Controls';
import type { TIntersectionsLoop } from '@hellpig/anarchy-engine/Intersections';
import type { TKinematicLoop } from '@hellpig/anarchy-engine/Kinematic';
import type { TLoopService, TLoopsSettings } from '@hellpig/anarchy-engine/Loop';
import { getMainLoopNameByType, LOOPS_DEFAULT_SETTINGS, LoopType, LoopUpdatePriority } from '@hellpig/anarchy-engine/Loop';
import { milliseconds } from '@hellpig/anarchy-engine/Measurements';
import type { TMouseLoop } from '@hellpig/anarchy-engine/Mouse';
import type { TPhysicsLoop } from '@hellpig/anarchy-engine/Physics';
import type { TRenderLoop, TSpaceLoops, TSpaceSettings } from '@hellpig/anarchy-engine/Space/Models';
import type { TSpatialLoop } from '@hellpig/anarchy-engine/Spatial';
import type { TTextLoop } from '@hellpig/anarchy-engine/Text';
import type { TTransformLoop } from '@hellpig/anarchy-engine/TransformDrive';

export function createLoops({ create }: TLoopService, spaceSettings: TSpaceSettings = {}): TSpaceLoops {
  const { Audio, Render, Intersections, Spatial, Mouse, Text, Kinematic, Collisions, Controls, Transform, Physics } = LoopType;

  const settings: TLoopsSettings = { ...LOOPS_DEFAULT_SETTINGS, ...spaceSettings.loopsSettings };

  const {
    audioLoopStep,
    physicsLoopStep,
    collisionsLoopStep,
    kinematicLoopStep,
    spatialLoopStep,
    transformLoopStep,
    textLoopStep,
    mouseLoopStep,
    intersectionsLoopStep,
    controlsLoopStep,
    isAudioParallel,
    isPhysicsParallel,
    isCollisionsParallel,
    isKinematicParallel,
    isSpatialParallel,
    isTransformParallel,
    isTextParallel,
    isMouseParallel,
    isIntersectionsParallel,
    isControlsParallel
  } = settings;

  // You could use testTickRate() to test the tick rate of the loop in the main stream and in "parallel mode" (in the worker),
  // cause usually loops in workers fires a way faster due to the fact that the worker is not blocked by the main thread (rendering and etc)
  // TL;DR: If you use parallel mode, set the "trigger" time higher.
  return {
    renderLoop: create({ name: getMainLoopNameByType(Render), type: Render, trigger: requestAnimationFrame }) as TRenderLoop,

    audioLoop: create({
      name: getMainLoopNameByType(Audio),
      type: Audio,
      trigger: milliseconds(audioLoopStep),
      isParallelMode: isAudioParallel,
      maxPriority: LoopUpdatePriority.ASAP
    }) as TAudioLoop,

    physicsLoop: create({
      name: getMainLoopNameByType(Physics),
      type: Physics,
      trigger: milliseconds(physicsLoopStep),
      isParallelMode: isPhysicsParallel
    }) as TPhysicsLoop,

    collisionsLoop: create({
      name: getMainLoopNameByType(Collisions),
      type: Collisions,
      trigger: milliseconds(collisionsLoopStep),
      isParallelMode: isCollisionsParallel,
      maxPriority: LoopUpdatePriority.ASAP
    }) as TCollisionsLoop,

    kinematicLoop: create({
      name: getMainLoopNameByType(Kinematic),
      type: Kinematic,
      trigger: milliseconds(kinematicLoopStep),
      isParallelMode: isKinematicParallel
    }) as TKinematicLoop,

    spatialLoop: create({
      name: getMainLoopNameByType(Spatial),
      type: Spatial,
      trigger: milliseconds(spatialLoopStep),
      isParallelMode: isSpatialParallel,
      maxPriority: LoopUpdatePriority.ASAP
    }) as TSpatialLoop,

    transformLoop: create({
      name: getMainLoopNameByType(Transform),
      type: Transform,
      trigger: milliseconds(transformLoopStep),
      isParallelMode: isTransformParallel
    }) as TTransformLoop,

    textLoop: create({
      name: getMainLoopNameByType(Text),
      type: Text,
      trigger: milliseconds(textLoopStep),
      isParallelMode: isTextParallel
    }) as TTextLoop,

    mouseLoop: create({
      name: getMainLoopNameByType(Mouse),
      type: Mouse,
      trigger: milliseconds(mouseLoopStep),
      isParallelMode: isMouseParallel
    }) as TMouseLoop,

    intersectionsLoop: create({
      name: getMainLoopNameByType(Intersections),
      type: Intersections,
      trigger: milliseconds(intersectionsLoopStep),
      isParallelMode: isIntersectionsParallel
    }) as TIntersectionsLoop,

    controlsLoop: create({
      name: getMainLoopNameByType(Controls),
      type: Controls,
      trigger: milliseconds(controlsLoopStep),
      isParallelMode: isControlsParallel
    }) as TControlsLoop
  };
}
