import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialCell } from './TSpatialCell';

export type TSpatialData = Readonly<{
  updatePriority: SpatialUpdatePriority;
  cell: TSpatialCell | undefined;
}>;
