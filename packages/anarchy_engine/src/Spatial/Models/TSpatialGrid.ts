import type { TSpatialCellWrapper } from '@Engine/Spatial';
import type RBush from 'rbush';

export type TSpatialGrid = RBush<TSpatialCellWrapper>;
