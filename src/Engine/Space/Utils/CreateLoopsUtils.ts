import type { TCollisionsLoop } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TLoopService } from '@/Engine/Loop';
import { LoopType, LoopUpdatePriority } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicalLoop } from '@/Engine/Physics';
import { SpaceLoopNames } from '@/Engine/Space/Constants';
import type { TRenderLoop, TSpaceLoops } from '@/Engine/Space/Models';
import type { TSpatialLoop } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';

export function createLoops({ create }: TLoopService): TSpaceLoops {
  // TODO 10.0.0. LOOPS: 16ms is hardcoded here, should be configurable
  // TODO 10.0.0. LOOPS: showDebugInfo is hardcoded here, should be configurable
  const { RenderMain, IntersectionsMain, SpatialMain, MouseMain, TextMain, KinematicMain, CollisionsMain, ControlsMain, TransformMain, KeyboardMain, PhysicalMain } = SpaceLoopNames;
  const { Render, Intersections, Spatial, Mouse, Text, Kinematic, Collisions, Controls, Transform, Keyboard, Physical } = LoopType;

  return {
    renderLoop: create({ name: RenderMain, type: Render, trigger: requestAnimationFrame, showDebugInfo: true }) as TRenderLoop,
    physicalLoop: create({ name: PhysicalMain, type: Physical, trigger: milliseconds(16) }) as TPhysicalLoop,
    collisionsLoop: create({ name: CollisionsMain, type: Collisions, trigger: milliseconds(16), maxPriority: LoopUpdatePriority.ASAP }) as TCollisionsLoop,
    kinematicLoop: create({ name: KinematicMain, type: Kinematic, trigger: milliseconds(16) }) as TKinematicLoop,
    spatialLoop: create({ name: SpatialMain, type: Spatial, trigger: milliseconds(16), maxPriority: LoopUpdatePriority.ASAP }) as TSpatialLoop,
    transformLoop: create({ name: TransformMain, type: Transform, trigger: milliseconds(16) }) as TTransformLoop,
    textLoop: create({ name: TextMain, type: Text, trigger: milliseconds(16) }) as TTextLoop,
    keyboardLoop: create({ name: KeyboardMain, type: Keyboard, trigger: milliseconds(16) }) as TKeyboardLoop,
    mouseLoop: create({ name: MouseMain, type: Mouse, trigger: milliseconds(16) }) as TMouseLoop,
    intersectionsLoop: create({ name: IntersectionsMain, type: Intersections, trigger: milliseconds(16) }) as TIntersectionsLoop,
    controlsLoop: create({ name: ControlsMain, type: Controls, trigger: milliseconds(16) }) as TControlsLoop
  };
}
