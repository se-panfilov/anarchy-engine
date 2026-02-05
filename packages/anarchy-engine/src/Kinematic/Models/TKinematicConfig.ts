import type { TOptional } from '@hellpig/anarchy-shared/Utils';

import type { TKinematicDataConfig } from './TKinematicDataConfig';

export type TKinematicConfig = TOptional<TKinematicDataConfig> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
