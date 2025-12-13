import type { TCollisionsLoop } from '@/Engine/Collisions';
import { CollisionsUpdatePriority } from '@/Engine/Collisions';
import type { TControlsLoop } from '@/Engine/Controls';
import type { TIntersectionsLoop } from '@/Engine/Intersections';
import type { TKeyboardLoop } from '@/Engine/Keyboard';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import type { TMouseLoop } from '@/Engine/Mouse';
import type { TPhysicalLoop } from '@/Engine/Physics';
import { SpaceMainLoopNames } from '@/Engine/Space/Constants';
import type { TRenderLoop, TSpaceLoops } from '@/Engine/Space/Models';
import type { TSpatialLoop } from '@/Engine/Spatial';
import { SpatialUpdatePriority } from '@/Engine/Spatial';
import type { TTextLoop } from '@/Engine/Text';
import type { TTransformLoop } from '@/Engine/TransformDrive';

// TODO 10.0.0. LOOPS: get rid of autoUpdate$ (and isAutoUpdate in config, guess)

export function createLoops(loopService: TLoopService): TSpaceLoops {
  // TODO 10.0.0. LOOPS: 16ms is hardcoded here, should be configurable
  // TODO 10.0.0. LOOPS: Make sure to make use of all of these loops
  return {
    renderLoop: loopService.create({ name: SpaceMainLoopNames.Render, type: LoopType.Render, trigger: requestAnimationFrame }) as TRenderLoop,
    physicalLoop: loopService.create({ name: SpaceMainLoopNames.Physical, type: LoopType.Physical, trigger: milliseconds(16) }) as TPhysicalLoop,
    collisionsLoop: loopService.create({ name: SpaceMainLoopNames.Collisions, type: LoopType.Collisions, trigger: milliseconds(16), maxPriority: CollisionsUpdatePriority.ASAP }) as TCollisionsLoop,
    kinematicLoop: loopService.create({ name: SpaceMainLoopNames.Kinematic, type: LoopType.Kinematic, trigger: milliseconds(16) }) as TKinematicLoop,
    spatialLoop: loopService.create({ name: SpaceMainLoopNames.Spatial, type: LoopType.Spatial, trigger: milliseconds(16), maxPriority: SpatialUpdatePriority.ASAP }) as TSpatialLoop,
    transformLoop: loopService.create({ name: SpaceMainLoopNames.Transform, type: LoopType.Transform, trigger: milliseconds(16) }) as TTransformLoop,
    textLoop: loopService.create({ name: SpaceMainLoopNames.Text, type: LoopType.Text, trigger: milliseconds(16) }) as TTextLoop,
    keyboardLoop: loopService.create({ name: SpaceMainLoopNames.Keyboard, type: LoopType.Keyboard, trigger: milliseconds(16) }) as TKeyboardLoop,
    mouseLoop: loopService.create({ name: SpaceMainLoopNames.Mouse, type: LoopType.Mouse, trigger: milliseconds(16) }) as TMouseLoop,
    intersectionsLoop: loopService.create({ name: SpaceMainLoopNames.Intersections, type: LoopType.Intersections, trigger: milliseconds(16) }) as TIntersectionsLoop,
    controlsLoop: loopService.create({ name: SpaceMainLoopNames.Controls, type: LoopType.Controls, trigger: milliseconds(16) }) as TControlsLoop
  };
}
