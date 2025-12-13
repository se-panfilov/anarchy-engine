import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialCell } from './TSpatialCell';
import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialData = Readonly<{
  updatePriority: SpatialUpdatePriority;
  grid: TSpatialGrid | undefined;
  cell: TSpatialCell | undefined;
}>;
