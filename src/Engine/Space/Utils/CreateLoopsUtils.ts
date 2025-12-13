import type { TCollisionsLoop } from '@/Engine/Collisions';
import { LoopType } from '@/Engine/Loop';
import { milliseconds } from '@/Engine/Measurements';
import { SpaceMainLoopNames } from '@/Engine/Space/Constants';
import type { TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';
import type { TSpatialLoop } from '@/Engine/Spatial';

export function createLoops({ loopService, physicsWorldService }: TSpaceServices): TSpaceLoops {
  // TODO 10.0.0. LOOPS: this creation must be done via the factory
  return {
    renderLoop: loopService.create({ name: SpaceMainLoopNames.Render, type: LoopType.Render, trigger: requestAnimationFrame }),
    physicalLoop: loopService.create({ name: SpaceMainLoopNames.Physical, type: LoopType.Physical, trigger: milliseconds(16), dependencies: { physicsWorldService } }),
    collisionsLoop: loopService.create({ name: SpaceMainLoopNames.Collisions, type: LoopType.Collisions, trigger: milliseconds(16) }) as TCollisionsLoop,
    kinematicLoop: loopService.create({ name: SpaceMainLoopNames.Kinematic, type: LoopType.Kinematic, trigger: milliseconds(16) }),
    spatialLoop: loopService.create({ name: SpaceMainLoopNames.Spatial, type: LoopType.Spatial, trigger: milliseconds(16) }) as TSpatialLoop
  };
}
