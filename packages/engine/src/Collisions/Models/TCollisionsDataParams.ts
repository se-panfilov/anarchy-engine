import type { TOptional } from '@/Utils';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataParams = TOptional<TCollisionsData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
