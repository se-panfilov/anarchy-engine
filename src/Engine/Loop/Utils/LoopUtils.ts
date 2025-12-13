import { LoopType } from '@/Engine/Loop/Constants';
import { SpaceMainLoopNames } from '@/Engine/Space';

export function getMainLoopNameByType(type: LoopType): SpaceMainLoopNames {
  switch (type) {
    case LoopType.Render:
      return SpaceMainLoopNames.RenderLoop;
    case LoopType.Physical:
      return SpaceMainLoopNames.PhysicalLoop;
    case LoopType.Collisions:
      return SpaceMainLoopNames.CollisionsLoop;
    case LoopType.Kinematic:
      return SpaceMainLoopNames.KinematicLoop;
    case LoopType.Spatial:
      return SpaceMainLoopNames.SpatialLoop;
    default:
      throw new Error(`Unknown loop type: ${type}`);
  }
}
