import type { TAudioLoop } from '@/Engine/Audio';
import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TLoopService } from '@/Engine/Loop';
import { getMainLoopNameByType, LoopType, LoopUpdatePriority } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicalLoop } from '@/Engine/Physics';
import type { TRenderLoop, TSpaceLoops } from '@/Engine/Space/Models';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';

export function createLoops({ create }: TLoopService): TSpaceLoops {
  const { Audio, Render, Intersections, Spatial, Mouse, Text, Kinematic, Collisions, Controls, Transform, Keyboard, Physical } = LoopType;

  // TODO 16-0-0: CONFIG: configs are comming from dotenv files, should be possible to override in runtime (via space config or something)
  // TODO 16-0-0: CONFIG: A fake config, unless we have a way to load this from space config or something
  const config: Record<string, any> = {};

  const showDebugInfo: boolean = config.showDebugInfo ?? import.meta.env.VITE_SHOW_DEBUG_INFO;

  //steps
  const audioLoopStep: number = config.audioLoopStep ?? import.meta.env.VITE_AUDIO_LOOP_STEP;
  const physicalLoopStep: number = config.physicalLoopStep ?? import.meta.env.VITE_PHYSICAL_LOOP_STEP;
  const collisionsLoopStep: number = config.collisionsLoopStep ?? import.meta.env.VITE_COLLISIONS_LOOP_STEP;
  const kinematicLoopStep: number = config.kinematicLoopStep ?? import.meta.env.VITE_KINEMATIC_LOOP_STEP;
  const spatialLoopStep: number = config.spatialLoopStep ?? import.meta.env.VITE_SPATIAL_LOOP_STEP;
  const transformLoopStep: number = config.transformLoopStep ?? import.meta.env.VITE_TRANSFORM_LOOP_STEP;
  const textLoopStep: number = config.textLoopStep ?? import.meta.env.VITE_TEXT_LOOP_STEP;
  const keyboardLoopStep: number = config.keyboardLoopStep ?? import.meta.env.VITE_KEYBOARD_LOOP_STEP;
  const mouseLoopStep: number = config.mouseLoopStep ?? import.meta.env.VITE_MOUSE_LOOP_STEP;
  const intersectionsLoopStep: number = config.intersectionsLoopStep ?? import.meta.env.VITE_INTERSECTIONS_LOOP_STEP;
  const controlsLoopStep: number = config.controlsLoopStep ?? import.meta.env.VITE_CONTROLS_LOOP_STEP;

  // Parallel mode
  const isAudioParallel: boolean = config.isAudioParallel ?? import.meta.env.VITE_AUDIO_LOOP_IS_PARALLEL;
  const isPhysicalParallel: boolean = config.isPhysicalParallel ?? import.meta.env.VITE_PHYSICAL_LOOP_IS_PARALLEL;
  const isCollisionsParallel: boolean = config.isCollisionsParallel ?? import.meta.env.VITE_COLLISIONS_LOOP_IS_PARALLEL;
  const isKinematicParallel: boolean = config.isKinematicParallel ?? import.meta.env.VITE_KINEMATIC_LOOP_IS_PARALLEL;
  const isSpatialParallel: boolean = config.isSpatialParallel ?? import.meta.env.VITE_SPATIAL_LOOP_IS_PARALLEL;
  const isTransformParallel: boolean = config.isTransformParallel ?? import.meta.env.VITE_TRANSFORM_LOOP_IS_PARALLEL;
  const isTextParallel: boolean = config.isTextParallel ?? import.meta.env.VITE_TEXT_LOOP_IS_PARALLEL;
  const isKeyboardParallel: boolean = config.isKeyboardParallel ?? import.meta.env.VITE_KEYBOARD_LOOP_IS_PARALLEL;
  const isMouseParallel: boolean = config.isMouseParallel ?? import.meta.env.VITE_MOUSE_LOOP_IS_PARALLEL;
  const isIntersectionsParallel: boolean = config.isIntersectionsParallel ?? import.meta.env.VITE_INTERSECTIONS_LOOP_IS_PARALLEL;
  const isControlsParallel: boolean = config.isControlsParallel ?? import.meta.env.VITE_CONTROLS_LOOP_IS_PARALLEL;

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

    physicalLoop: create({
      name: getMainLoopNameByType(Physical),
      type: Physical,
      trigger: milliseconds(physicalLoopStep),
      isParallelMode: isPhysicalParallel
    }) as TPhysicalLoop,

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
