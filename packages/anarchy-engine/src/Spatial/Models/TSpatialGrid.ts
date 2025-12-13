import type { TSpatialCellWrapper } from '@Anarchy/Engine/Spatial';
import type RBush from 'rbush';

export type TSpatialGrid = RBush<TSpatialCellWrapper>;
