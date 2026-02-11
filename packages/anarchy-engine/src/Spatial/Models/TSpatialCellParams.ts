import type { TWithNameOptional } from '@Anarchy/Engine/Mixins';

export type TSpatialCellParams = Readonly<{
  minX: number;
  minZ: number;
  maxX: number;
  maxZ: number;
  x: number;
  z: number;
}> &
  TWithNameOptional;
