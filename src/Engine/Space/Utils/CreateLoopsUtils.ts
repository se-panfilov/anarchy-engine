import { milliseconds } from '@/Engine/Measurements';
import { CollisionsLoop, KinematicLoop, RenderLoop, SpatialLoop } from '@/Engine/Space/Loops';
import { PhysicalLoop } from '@/Engine/Space/Loops/PhysicalLoop';
import type { TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';

export function createLoops(services: TSpaceServices): TSpaceLoops {
  return {
    renderLoop: RenderLoop(services.loopService, requestAnimationFrame),
    physicalLoop: PhysicalLoop(services.loopService, services.physicsWorldService, milliseconds(16)),
    collisionsLoop: CollisionsLoop(services.loopService, milliseconds(16)),
    kinematicLoop: KinematicLoop(services.loopService, milliseconds(16)),
    spatialLoop: SpatialLoop(services.loopService, milliseconds(16))
  };
}
