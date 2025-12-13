import type RBush from 'rbush';

import type { TSpatialCellWrapper } from '@/Spatial';

export type TSpatialGrid = RBush<TSpatialCellWrapper>;
