import type RBush from 'rbush';

import type { TSpatialCellWrapper } from '@/Engine/Spatial';

export type TSpatialGrid = RBush<TSpatialCellWrapper>;
