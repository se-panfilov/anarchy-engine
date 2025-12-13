import type { TAudioLoop } from '@/Audio';
import type { TCollisionsLoop } from '@/Collisions';
import type { TControlsLoop } from '@/Controls';
import { runtimeEnv } from '@/env';
import type { TIntersectionsLoop } from '@/Intersections';
import type { TKeyboardLoop } from '@/Keyboard';
import type { TKinematicLoop } from '@/Kinematic';
import type { TLoopService } from '@/Loop';
import { getMainLoopNameByType, LoopType, LoopUpdatePriority } from '@/Loop';
import { milliseconds } from '@/Measurements';
import type { TMouseLoop } from '@/Mouse';
import type { TPhysicsLoop } from '@/Physics';
import type { TRenderLoop, TSpaceLoops } from '@/Space/Models';
import type { TSpatialLoop } from '@/Spatial';
import type { TTextLoop } from '@/Text';
import type { TTransformLoop } from '@/TransformDrive';

export function createLoops({ create }: TLoopService): TSpaceLoops {
  const { Audio, Render, Intersections, Spatial, Mouse, Text, Kinematic, Collisions, Controls, Transform, Keyboard, Physics } = LoopType;

  // TODO 16-0-0: CONFIG: configs are coming from dotenv files, should be possible to override in runtime (via space config or something)
  // TODO 16-0-0: CONFIG: A fake config, unless we have a way to load this from space config or something
  const config: Record<string, any> = {};

  // TODO 18-0-0: MONO: VITE_SHOW_DEBUG_INFO should come from the app config, not from the env/engine
  const showDebugInfo: boolean = config.showDebugInfo ?? runtimeEnv.VITE_SHOW_DEBUG_INFO;

  //steps
  const audioLoopStep: number = config.audioLoopStep ?? runtimeEnv.VITE_AUDIO_LOOP_STEP;
  const physicsLoopStep: number = config.physicsLoopStep ?? runtimeEnv.VITE_PHYSICS_LOOP_STEP;
  const collisionsLoopStep: number = config.collisionsLoopStep ?? runtimeEnv.VITE_COLLISIONS_LOOP_STEP;
  const kinematicLoopStep: number = config.kinematicLoopStep ?? runtimeEnv.VITE_KINEMATIC_LOOP_STEP;
  const spatialLoopStep: number = config.spatialLoopStep ?? runtimeEnv.VITE_SPATIAL_LOOP_STEP;
  const transformLoopStep: number = config.transformLoopStep ?? runtimeEnv.VITE_TRANSFORM_LOOP_STEP;
  const textLoopStep: number = config.textLoopStep ?? runtimeEnv.VITE_TEXT_LOOP_STEP;
  const keyboardLoopStep: number = config.keyboardLoopStep ?? runtimeEnv.VITE_KEYBOARD_LOOP_STEP;
  const mouseLoopStep: number = config.mouseLoopStep ?? runtimeEnv.VITE_MOUSE_LOOP_STEP;
  const intersectionsLoopStep: number = config.intersectionsLoopStep ?? runtimeEnv.VITE_INTERSECTIONS_LOOP_STEP;
  const controlsLoopStep: number = config.controlsLoopStep ?? runtimeEnv.VITE_CONTROLS_LOOP_STEP;

  // Parallel mode
  const isAudioParallel: boolean = config.isAudioParallel ?? runtimeEnv.VITE_AUDIO_LOOP_IS_PARALLEL;
  const isPhysicsParallel: boolean = config.isPhysicsParallel ?? runtimeEnv.VITE_PHYSICS_LOOP_IS_PARALLEL;
  const isCollisionsParallel: boolean = config.isCollisionsParallel ?? runtimeEnv.VITE_COLLISIONS_LOOP_IS_PARALLEL;
  const isKinematicParallel: boolean = config.isKinematicParallel ?? runtimeEnv.VITE_KINEMATIC_LOOP_IS_PARALLEL;
  const isSpatialParallel: boolean = config.isSpatialParallel ?? runtimeEnv.VITE_SPATIAL_LOOP_IS_PARALLEL;
  const isTransformParallel: boolean = config.isTransformParallel ?? runtimeEnv.VITE_TRANSFORM_LOOP_IS_PARALLEL;
  const isTextParallel: boolean = config.isTextParallel ?? runtimeEnv.VITE_TEXT_LOOP_IS_PARALLEL;
  const isKeyboardParallel: boolean = config.isKeyboardParallel ?? runtimeEnv.VITE_KEYBOARD_LOOP_IS_PARALLEL;
  const isMouseParallel: boolean = config.isMouseParallel ?? runtimeEnv.VITE_MOUSE_LOOP_IS_PARALLEL;
  const isIntersectionsParallel: boolean = config.isIntersectionsParallel ?? runtimeEnv.VITE_INTERSECTIONS_LOOP_IS_PARALLEL;
  const isControlsParallel: boolean = config.isControlsParallel ?? runtimeEnv.VITE_CONTROLS_LOOP_IS_PARALLEL;

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
