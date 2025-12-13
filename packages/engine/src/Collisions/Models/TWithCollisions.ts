import type { BehaviorSubject, Observable } from 'rxjs';

import type { TDestroyable } from '@/Mixins';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TCollisionsData } from './TCollisionsData';
import type { TCollisionsMethods } from './TCollisionsMethods';

export type TWithCollisions = Readonly<{
  collisions: Readonly<{ data: TCollisionsData }> &
    Readonly<{
      autoUpdate$: BehaviorSubject<boolean>;
      value$: Observable<TCollisionCheckResult>;
    }> &
    TCollisionsMethods &
    TDestroyable;
}>;
