import type { TOptional } from '@Shared/Utils';

import type { TKinematicDataConfig } from './TKinematicDataConfig';

export type TKinematicConfig = TOptional<TKinematicDataConfig> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
