import { LoopType } from '@/Engine/Loop/Constants';
import { SpaceLoopNames } from '@/Engine/Space';

export function getMainLoopNameByType(type: LoopType): SpaceLoopNames {
  switch (type) {
    case LoopType.Render:
      return SpaceLoopNames.RenderMain;
    case LoopType.Physical:
      return SpaceLoopNames.PhysicalMain;
    case LoopType.Collisions:
      return SpaceLoopNames.CollisionsMain;
    case LoopType.Kinematic:
      return SpaceLoopNames.KinematicMain;
    case LoopType.Spatial:
      return SpaceLoopNames.SpatialMain;
    default:
      throw new Error(`Unknown loop type: ${type}`);
  }
}
