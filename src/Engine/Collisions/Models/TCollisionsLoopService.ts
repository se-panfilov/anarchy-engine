import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TDestroyable } from '@/Engine/Mixins';

export type TCollisionsLoopServiceValue = Readonly<{ delta: number; priority: CollisionsUpdatePriority }>;

export type TCollisionsLoopService = TAbstractLoopService<TCollisionsLoopServiceValue> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
