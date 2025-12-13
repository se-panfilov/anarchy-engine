import type { TAudioLoop } from '@Engine/Audio';
import type { TCollisionsLoop } from '@Engine/Collisions';
import type { TControlsLoop } from '@Engine/Controls';
import type { TIntersectionsLoop } from '@Engine/Intersections';
import type { TKeyboardLoop } from '@Engine/Keyboard';
import type { TKinematicLoop } from '@Engine/Kinematic';
import type { TLoopService, TLoopsSettings } from '@Engine/Loop';
import { getMainLoopNameByType, LOOPS_DEFAULT_SETTINGS, LoopType, LoopUpdatePriority } from '@Engine/Loop';
import { milliseconds } from '@Engine/Measurements';
import type { TMouseLoop } from '@Engine/Mouse';
import type { TPhysicsLoop } from '@Engine/Physics';
import type { TRenderLoop, TSpaceFlags, TSpaceLoops, TSpaceOptions } from '@Engine/Space/Models';
import type { TSpatialLoop } from '@Engine/Spatial';
import type { TTextLoop } from '@Engine/Text';
import type { TTransformLoop } from '@Engine/TransformDrive';

export function createLoops({ create }: TLoopService, options: TSpaceOptions | undefined, flags?: TSpaceFlags): TSpaceLoops {
  const { Audio, Render, Intersections, Spatial, Mouse, Text, Kinematic, Collisions, Controls, Transform, Keyboard, Physics } = LoopType;

  const showDebugInfo: boolean = flags?.loopsDebugInfo ?? false;
  const settings: TLoopsSettings = { ...LOOPS_DEFAULT_SETTINGS, ...options?.loopsSettings };

  const {
    audioLoopStep,
    physicsLoopStep,
    collisionsLoopStep,
    kinematicLoopStep,
    spatialLoopStep,
    transformLoopStep,
    textLoopStep,
    keyboardLoopStep,
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
    isKeyboardParallel,
    isMouseParallel,
    isIntersectionsParallel,
    isControlsParallel
  } = settings;

  // You could use testTickRate() to test the tick rate of the loop in the main stream and in "parallel mode" (in the worker),
  // cause usually loops in workers fires a way faster due to the fact that the worker is not blocked by the main thread (rendering and etc)
  // TL;DR: If you use parallel mode, set the "trigger" time higher.
  return {
    renderLoop: create({ name: getMainLoopNameByType(Render), type: Render, trigger: requestAnimationFrame, showDebugInfo }) as TRenderLoop,

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

    keyboardLoop: create({
      name: getMainLoopNameByType(Keyboard),
      type: Keyboard,
      trigger: milliseconds(keyboardLoopStep),
      isParallelMode: isKeyboardParallel
    }) as TKeyboardLoop,

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
