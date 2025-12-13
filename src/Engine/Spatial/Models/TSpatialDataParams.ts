import type { TOptional } from '@/Engine/Utils';

import type { TSpatialData } from './TSpatialData';

export type TSpatialDataParams = Omit<TOptional<TSpatialData>, 'cells'> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
