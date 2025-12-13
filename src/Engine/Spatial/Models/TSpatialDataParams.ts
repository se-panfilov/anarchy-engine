import type { TSpatialData } from './TSpatialData';

export type TSpatialDataParams = Omit<TSpatialData, 'cells' | 'updatePriority'> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
