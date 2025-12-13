import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialData } from './TSpatialData';
import type { TSpatialGridWrapper } from './TSpatialGridWrapper';

export type TSpatialMethods = Readonly<{
  isAutoUpdate: () => boolean;
  setAutoUpdate: (value: boolean) => void;
  setSpatialUpdatePriority: (priority: SpatialUpdatePriority) => void;
  getSpatialUpdatePriority: () => SpatialUpdatePriority;
  setData: (data: TSpatialData) => void;
  getData: () => TSpatialData;
  setGrid: (grid: TSpatialGridWrapper) => void;
  getGrid: () => TSpatialGridWrapper | undefined;
  resetGrid: () => void;
  getSpatialCells: () => ReadonlyArray<TSpatialCellWrapper>;
  setSpatialCells: (cells: ReadonlyArray<TSpatialCellWrapper>) => void;
  resetSpatialCells: () => void;
}>;
