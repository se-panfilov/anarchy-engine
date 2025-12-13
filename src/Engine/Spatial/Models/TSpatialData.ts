import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialData = Readonly<{
  updatePriority: SpatialUpdatePriority;
  grid: TSpatialGridWrapper | undefined;
  cells: ReadonlyArray<TSpatialCellWrapper>;
}>;
