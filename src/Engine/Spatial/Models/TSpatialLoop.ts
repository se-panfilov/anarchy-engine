import type { BehaviorSubject } from 'rxjs';

import type { TLoop } from '@/Engine/Loop/Models';
import type { SpatialUpdatePriority } from '@/Engine/Spatial';

export type TSpatialLoop = TLoop &
  Readonly<{
    priority$: BehaviorSubject<SpatialUpdatePriority>;
  }>;
