import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialData } from './TSpatialData';
import type { TWithSpatialCell } from './TWithSpatialCell';

export type TSpatialMethods = Readonly<{
  isAutoUpdate: () => boolean;
  setAutoUpdate: (value: boolean) => void;
  setSpatialUpdatePriority: (priority: SpatialUpdatePriority) => void;
  getSpatialUpdatePriority: () => SpatialUpdatePriority;
  setData: (data: TSpatialData) => void;
  getData: () => TSpatialData;
}> &
  TWithSpatialCell;
