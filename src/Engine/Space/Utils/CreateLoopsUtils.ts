import { CollisionsLoop } from '@/Engine/Collisions';
import { KinematicLoop } from '@/Engine/Kinematic';
import { milliseconds } from '@/Engine/Measurements';
import { PhysicalLoop } from '@/Engine/Physics';
import { RenderLoop } from '@/Engine/Space/Loops';
import type { TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';
import { SpatialLoop } from '@/Engine/Spatial';

export function createLoops(services: TSpaceServices): TSpaceLoops {
  return {
    renderLoop: RenderLoop(services.loopService, requestAnimationFrame),
    physicalLoop: PhysicalLoop(services.loopService, services.physicsWorldService, milliseconds(16)),
    collisionsLoop: CollisionsLoop(services.loopService, milliseconds(16)),
    kinematicLoop: KinematicLoop(services.loopService, milliseconds(16)),
    spatialLoop: SpatialLoop(services.loopService, milliseconds(16))
  };
}
