import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

// TODO 10.0.0. LOOPS: do we need this?
export type TSpatialLoopServiceValue = Readonly<{ delta: TMilliseconds; priority: SpatialUpdatePriority }>;

// TODO 10.0.0. LOOPS: do we need this?
export type TSpatialLoopService = TAbstractLoop<TSpatialLoopServiceValue> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
