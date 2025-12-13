import { CollisionsLoop } from '@/Engine/Collisions';
import { KinematicLoop } from '@/Engine/Kinematic';
import { milliseconds } from '@/Engine/Measurements';
import { PhysicalLoop } from '@/Engine/Physics';
import { SpaceMainLoopNames } from '@/Engine/Space/Constants';
import { RenderLoop } from '@/Engine/Space/Loops';
import type { TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';
import { SpatialLoop } from '@/Engine/Spatial';

export function createLoops({ loopService, physicsWorldService }: TSpaceServices): TSpaceLoops {
  return {
    renderLoop: RenderLoop(SpaceMainLoopNames.Render, loopService, requestAnimationFrame),
    physicalLoop: PhysicalLoop(SpaceMainLoopNames.Physical, loopService, physicsWorldService, milliseconds(16)),
    collisionsLoop: CollisionsLoop(SpaceMainLoopNames.Collisions, loopService, milliseconds(16)),
    kinematicLoop: KinematicLoop(SpaceMainLoopNames.Kinematic, loopService, milliseconds(16)),
    spatialLoop: SpatialLoop(SpaceMainLoopNames.Spatial, loopService, milliseconds(16))
  };
}
