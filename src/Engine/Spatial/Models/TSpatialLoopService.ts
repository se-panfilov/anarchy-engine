import type { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

export type TSpatialLoopServiceValue = Readonly<{ delta: number; priority: SpatialUpdatePriority }>;

export type TSpatialLoopService = Readonly<{
  tick$: Subject<TSpatialLoopServiceValue>;
  isAutoUpdate: () => boolean;
  shouldAutoUpdate: (value: boolean) => void;
}> &
  TDestroyable;
