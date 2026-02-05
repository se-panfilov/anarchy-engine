import type { TWithNameOptional } from '@hellpig/anarchy-engine/Mixins';

export type TSpatialCellParams = Readonly<{
  minX: number;
  minZ: number;
  maxX: number;
  maxZ: number;
  x: number;
  z: number;
}> &
  TWithNameOptional;
