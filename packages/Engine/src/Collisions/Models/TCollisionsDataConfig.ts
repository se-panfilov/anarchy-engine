import type { TOptional } from '@/Engine/Utils';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataConfig = TOptional<TCollisionsData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
