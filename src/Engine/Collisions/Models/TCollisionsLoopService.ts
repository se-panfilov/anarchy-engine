import type { Subject } from 'rxjs';

import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TDestroyable } from '@/Engine/Mixins';

export type TCollisionsLoopServiceValue = Readonly<{ delta: number; priority: CollisionsUpdatePriority }>;

export type TCollisionsLoopService = Readonly<{
  tick$: Subject<TCollisionsLoopServiceValue>;
  isAutoUpdate: () => boolean;
  shouldAutoUpdate: (value: boolean) => void;
}> &
  TDestroyable;
