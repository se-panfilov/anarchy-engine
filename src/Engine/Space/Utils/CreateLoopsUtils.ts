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
  // TODO 10.0.0. LOOPS: 16ms is hardcoded here, should be configurable
  // TODO 10.0.0. LOOPS: showDebugInfo is hardcoded here, should be configurable
  const { Audio, Render, Intersections, Spatial, Mouse, Text, Kinematic, Collisions, Controls, Transform, Keyboard, Physical } = LoopType;

  // You could use testTickRate() to test the tick rate of the loop in the main stream and in "parallel mode" (in the worker),
  // cause usually loops in workers fires a way faster due to the fact that the worker is not blocked by the main thread (rendering and etc)
  // TL;DR: If use parallel mode, set the "trigger" time higher.
  return {
    renderLoop: create({ name: getMainLoopNameByType(Render), type: Render, trigger: requestAnimationFrame, showDebugInfo: true }) as TRenderLoop,
    audioLoop: create({ name: getMainLoopNameByType(Audio), type: Audio, trigger: milliseconds(16), isParallelMode: false, maxPriority: LoopUpdatePriority.ASAP }) as TAudioLoop,
    physicalLoop: create({ name: getMainLoopNameByType(Physical), type: Physical, trigger: milliseconds(16), isParallelMode: false }) as TPhysicalLoop,
    collisionsLoop: create({ name: getMainLoopNameByType(Collisions), type: Collisions, trigger: milliseconds(16), isParallelMode: false, maxPriority: LoopUpdatePriority.ASAP }) as TCollisionsLoop,
    kinematicLoop: create({ name: getMainLoopNameByType(Kinematic), type: Kinematic, trigger: milliseconds(16), isParallelMode: false }) as TKinematicLoop,
    spatialLoop: create({ name: getMainLoopNameByType(Spatial), type: Spatial, trigger: milliseconds(16), isParallelMode: false, maxPriority: LoopUpdatePriority.ASAP }) as TSpatialLoop,
    transformLoop: create({ name: getMainLoopNameByType(Transform), type: Transform, trigger: milliseconds(16), isParallelMode: false }) as TTransformLoop,
    textLoop: create({ name: getMainLoopNameByType(Text), type: Text, trigger: milliseconds(16), isParallelMode: false }) as TTextLoop,
    keyboardLoop: create({ name: getMainLoopNameByType(Keyboard), type: Keyboard, trigger: milliseconds(16), isParallelMode: false }) as TKeyboardLoop,
    mouseLoop: create({ name: getMainLoopNameByType(Mouse), type: Mouse, trigger: milliseconds(16), isParallelMode: false }) as TMouseLoop,
    intersectionsLoop: create({ name: getMainLoopNameByType(Intersections), type: Intersections, trigger: milliseconds(16), isParallelMode: false }) as TIntersectionsLoop,
    controlsLoop: create({ name: getMainLoopNameByType(Controls), type: Controls, trigger: milliseconds(16), isParallelMode: false }) as TControlsLoop
  };
}
