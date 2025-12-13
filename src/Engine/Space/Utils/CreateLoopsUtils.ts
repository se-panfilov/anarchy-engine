import { CollisionsLoop } from '@/Engine/Collisions';
import { KinematicLoop } from '@/Engine/Kinematic';
import { milliseconds } from '@/Engine/Measurements';
import { PhysicalLoop } from '@/Engine/Physics';
import { RenderLoop } from '@/Engine/Space/Loops';
import type { TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';
import { SpatialLoop } from '@/Engine/Spatial';

export function createLoops({ loopService, physicsWorldService }: TSpaceServices): TSpaceLoops {
  return {
    renderLoop: RenderLoop(loopService, requestAnimationFrame),
    physicalLoop: PhysicalLoop(loopService, physicsWorldService, milliseconds(16)),
    collisionsLoop: CollisionsLoop(loopService, milliseconds(16)),
    kinematicLoop: KinematicLoop(loopService, milliseconds(16)),
    spatialLoop: SpatialLoop(loopService, milliseconds(16))
  };
}
