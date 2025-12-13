import { CollisionsLoop, KinematicLoop, RenderLoop, SpatialLoop } from '@/Engine/Space/Loops';
import { PhysicalLoop } from '@/Engine/Space/Loops/PhysicalLoop';
import type { TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';

export function createLoops(services: TSpaceServices): TSpaceLoops {
  return {
    renderLoop: RenderLoop(services.loopService),
    physicalLoop: PhysicalLoop(services.loopService, services.physicsWorldService),
    collisionsLoop: CollisionsLoop(services.loopService),
    kinematicLoop: KinematicLoop(services.loopService),
    spatialLoop: SpatialLoop(services.loopService)
  };
}
