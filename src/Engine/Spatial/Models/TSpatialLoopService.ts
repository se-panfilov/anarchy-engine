import type { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import type { SpatialUpdatePriority } from '@/Engine/Spatial/Constants';

export type TSpatialLoopService = Readonly<{
  tick$: Subject<{ delta: number; priority: SpatialUpdatePriority }>;
  isAutoUpdate: () => boolean;
  shouldAutoUpdate: (value: boolean) => void;
}> &
  TDestroyable;
