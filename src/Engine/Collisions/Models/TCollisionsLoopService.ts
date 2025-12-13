import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TDestroyable } from '@/Engine/Mixins';

export type TCollisionsLoopServiceValue = Readonly<{ delta: number; priority: CollisionsUpdatePriority }>;

export type TCollisionsLoopService = TAbstractLoop<TCollisionsLoopServiceValue> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
