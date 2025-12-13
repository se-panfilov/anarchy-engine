import type { TWithName } from '@/Engine/Mixins';

export type TSpatialGridProps = Readonly<{
  mapWidth: number;
  mapHeight: number;
  cellSize: number;
  centerX: number;
  centerZ: number;
}> &
  TWithName;
