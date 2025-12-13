import type { TCollisionsLoop } from '@/Engine/Collisions';
import { CollisionsUpdatePriority } from '@/Engine/Collisions';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import type { TLoopService } from '@/Engine/Loop';
import { LoopType } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import type { TPhysicalLoop } from '@/Engine/Physics';
import { SpaceMainLoopNames } from '@/Engine/Space/Constants';
import type { TRenderLoop, TSpaceLoops } from '@/Engine/Space/Models';
import type { TSpatialLoop } from '@/Engine/Spatial';
import { SpatialUpdatePriority } from '@/Engine/Spatial';
import type { TTransformLoop } from '@/Engine/TransformDrive';

// TODO 10.0.0. LOOPS: add mouse loop?
// TODO 10.0.0. LOOPS: add intersection loop?
// TODO 10.0.0. LOOPS: add transforms loop?
// TODO 10.0.0. LOOPS: add keyboard loop?
// TODO 10.0.0. LOOPS: add text loop?
// TODO 10.0.0. LOOPS: get rid of autoUpdate$ (and isAutoUpdate in config, guess)

export function createLoops(loopService: TLoopService): TSpaceLoops {
  // TODO 10.0.0. LOOPS: 16ms is hardcoded here, should be configurable
  return {
    renderLoop: loopService.create({ name: SpaceMainLoopNames.Render, type: LoopType.Render, trigger: requestAnimationFrame }) as TRenderLoop,
    physicalLoop: loopService.create({ name: SpaceMainLoopNames.Physical, type: LoopType.Physical, trigger: milliseconds(16) }) as TPhysicalLoop,
    collisionsLoop: loopService.create({ name: SpaceMainLoopNames.Collisions, type: LoopType.Collisions, trigger: milliseconds(16), maxPriority: CollisionsUpdatePriority.ASAP }) as TCollisionsLoop,
    kinematicLoop: loopService.create({ name: SpaceMainLoopNames.Kinematic, type: LoopType.Kinematic, trigger: milliseconds(16) }) as TKinematicLoop,
    spatialLoop: loopService.create({ name: SpaceMainLoopNames.Spatial, type: LoopType.Spatial, trigger: milliseconds(16), maxPriority: SpatialUpdatePriority.ASAP }) as TSpatialLoop,
    transformLoop: loopService.create({ name: SpaceMainLoopNames.Transform, type: LoopType.Transform, trigger: milliseconds(16) }) as TTransformLoop
  };
}
