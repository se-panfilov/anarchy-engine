import type RBush from 'rbush';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';

export type TSpatialGrid = RBush<TSpatialCellWrapper>;
