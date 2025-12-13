import type { TOptional } from '@Engine/Utils';

import type { TKinematicDataConfig } from './TKinematicDataConfig';

export type TKinematicConfig = TOptional<TKinematicDataConfig> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
