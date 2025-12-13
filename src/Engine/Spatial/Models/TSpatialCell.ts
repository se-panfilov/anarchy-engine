import type { BBox } from 'rbush';

import type { TActorWrapperAsync } from '@/Engine/Actor';

export type TSpatialCellId = `spatial_cell_${number}_${number}`;

export type TSpatialCell = BBox & Readonly<{ id: TSpatialCellId; objects: Array<TActorWrapperAsync> }>;
