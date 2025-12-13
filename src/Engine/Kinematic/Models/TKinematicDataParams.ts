import type { TOptional } from '@/Engine/Utils';

import type { TKinematicData } from './TKinematicData';

export type TKinematicDataParams = TOptional<TKinematicData> &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
