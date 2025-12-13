import type { TOptional } from '@/Engine/Utils';

import type { TSpatialData } from './TSpatialData';

export type TSpatialDataConfig = TOptional<Omit<TSpatialData, 'cell' | 'grid'>> & Readonly<{ gridName?: string }>;
