import type RBush from 'rbush';

import type { TSpatialCell } from '@/Engine/Spatial';

export type TSpatialGrid = RBush<TSpatialCell>;
