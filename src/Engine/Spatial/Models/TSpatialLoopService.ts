import type { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

export type TSpatialLoopServiceValue = Readonly<{ delta: number; priority: SpatialUpdatePriority }>;

export type TSpatialLoopService = Readonly<{
  tick$: Subject<TSpatialLoopServiceValue>;
  autoUpdate$: BehaviorSubject<boolean>;
}> &
  TDestroyable;
