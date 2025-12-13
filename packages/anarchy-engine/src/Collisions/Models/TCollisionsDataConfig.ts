import type { TOptional } from '@Shared/Utils';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataConfig = TOptional<TCollisionsData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
