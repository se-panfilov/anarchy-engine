import type { TOptional } from '@/Engine/Utils';

import type { TKinematicData } from './TKinematicData';

export type TKinematicDataConfig = TOptional<TKinematicData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
