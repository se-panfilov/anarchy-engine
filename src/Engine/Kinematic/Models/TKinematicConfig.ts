import type { TOptional } from '@/Engine/Utils';

import type { TKinematicData } from './TKinematicData';

export type TKinematicConfig = TOptional<TKinematicData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
