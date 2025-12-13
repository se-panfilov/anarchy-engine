import type { TOptional } from '@Shared/Utils';

import type { TSpatialData } from './TSpatialData';

export type TSpatialDataConfig = TOptional<Omit<TSpatialData, 'cells' | 'grid'>> &
  Readonly<{
    isAutoUpdate: boolean;
    grid: string;
  }>;
