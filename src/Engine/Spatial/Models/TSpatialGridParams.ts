import type { TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';

export type TSpatialGridParams = Readonly<{
  mapWidth: number;
  mapHeight: number;
  cellSize: number;
  centerX: number;
  centerZ: number;
}> &
  TWithNameOptional &
  TWithReadonlyTags;
