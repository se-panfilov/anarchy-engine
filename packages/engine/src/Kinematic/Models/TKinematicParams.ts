import type { TOptional } from '@/Utils';

import type { TKinematicOptionalData } from './TKinematicData';

export type TKinematicParams = TOptional<TKinematicOptionalData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
