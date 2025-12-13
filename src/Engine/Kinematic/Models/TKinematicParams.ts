import type { TOptional } from '@/Engine/Utils';

import type { TKinematicData } from './TKinematicData';

export type TKinematicParams = TOptional<TKinematicData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
