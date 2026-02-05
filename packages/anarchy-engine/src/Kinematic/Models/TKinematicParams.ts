import type { TOptional } from '@hellpig/anarchy-shared/Utils';

import type { TKinematicOptionalData } from './TKinematicData';

export type TKinematicParams = TOptional<TKinematicOptionalData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
