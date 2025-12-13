import type RBush from 'rbush';

import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

import type { TSpatialCell } from './TSpatialCell';

export type TSpatialData = Readonly<{
  updatePriority: SpatialUpdatePriority;
  tree: RBush<TSpatialCell> | undefined;
  cell: TSpatialCell | undefined;
}>;
