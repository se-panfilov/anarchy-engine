import type { TOptional } from '@hellpig/anarchy-shared/Utils';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataConfig = TOptional<TCollisionsData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
