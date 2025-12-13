import type { TOptional } from '@/Utils';

import type { TSpatialData } from './TSpatialData';
import type { TSpatialPerformanceOptions } from './TSpatialPerformanceOptions';

export type TSpatialDataParams = Omit<TOptional<TSpatialData>, 'cells'> &
  Readonly<{
    isAutoUpdate: boolean;
    performance?: TSpatialPerformanceOptions;
  }>;
