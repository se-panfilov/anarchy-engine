import { LoopType } from '@/Engine/Loop/Constants';
import { SpaceMainLoopNames } from '@/Engine/Space';

export function getMainLoopNameByType(type: LoopType): SpaceMainLoopNames {
  switch (type) {
    case LoopType.Render:
      return SpaceMainLoopNames.Render;
    case LoopType.Physical:
      return SpaceMainLoopNames.Physical;
    case LoopType.Collisions:
      return SpaceMainLoopNames.Collisions;
    case LoopType.Kinematic:
      return SpaceMainLoopNames.Kinematic;
    case LoopType.Spatial:
      return SpaceMainLoopNames.Spatial;
    default:
      throw new Error(`Unknown loop type: ${type}`);
  }
}
