import type { LoopUpdatePriority } from '@Anarchy/Engine/Loop';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialData } from './TSpatialData';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialMethods = Readonly<{
  setSpatialUpdatePriority: (priority: LoopUpdatePriority) => void;
  getSpatialUpdatePriority: () => LoopUpdatePriority;
  setData: (data: TSpatialData) => void;
  getData: () => TSpatialData;
  setGrid: (grid: TSpatialGridWrapper) => void;
  getGrid: () => TSpatialGridWrapper | undefined;
  resetGrid: () => void;
  getSpatialCells: () => ReadonlyArray<TSpatialCellWrapper>;
  setSpatialCells: (cells: ReadonlyArray<TSpatialCellWrapper>) => void;
  resetSpatialCells: () => void;
}>;
