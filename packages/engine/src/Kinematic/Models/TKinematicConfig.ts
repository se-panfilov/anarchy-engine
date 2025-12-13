import type { TOptional } from '@/Utils';

import type { TKinematicDataConfig } from './TKinematicDataConfig';

export type TKinematicConfig = TOptional<TKinematicDataConfig> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
