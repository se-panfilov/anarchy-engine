import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialCell } from './TSpatialCell';
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
  getSpatialCell: () => TSpatialCell | undefined;
  setSpatialCell: (cell: TSpatialCell | undefined) => void;
  resetSpatialCell: () => void;
}>;
