import type { TOptional } from '@/Engine/Utils';

import type { TKinematicOptionalData } from './TKinematicData';

export type TKinematicParams = TOptional<TKinematicOptionalData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
