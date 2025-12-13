import type { TOptional } from '@/Engine/Utils';

import type { TSpatialData } from './TSpatialData';

export type TSpatialDataConfig = TOptional<Omit<TSpatialData, 'cells' | 'grid'>> & Readonly<{ gridName?: string }>;
