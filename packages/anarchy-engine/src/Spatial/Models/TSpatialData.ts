import type { LoopUpdatePriority } from '@hellpig/anarchy-engine/Loop';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialData = Readonly<{
  updatePriority: LoopUpdatePriority;
  grid: TSpatialGridWrapper | undefined;
  cells: ReadonlyArray<TSpatialCellWrapper>;
}>;
