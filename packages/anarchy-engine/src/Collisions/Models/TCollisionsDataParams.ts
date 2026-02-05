import type { TOptional } from '@hellpig/anarchy-shared/Utils';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataParams = TOptional<TCollisionsData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
