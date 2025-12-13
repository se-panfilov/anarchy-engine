import type { TOptional } from '@Anarchy/Shared/Utils';

import type { TCollisionsData } from './TCollisionsData';

export type TCollisionsDataParams = TOptional<TCollisionsData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
