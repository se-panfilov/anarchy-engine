import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataParams = Omit<TCollisionsData, 'updatePriority'> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
