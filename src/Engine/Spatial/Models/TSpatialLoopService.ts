import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

export type TSpatialLoopServiceValue = Readonly<{ delta: TMilliseconds; priority: SpatialUpdatePriority }>;

export type TSpatialLoopService = TAbstractLoopService<TSpatialLoopServiceValue> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
