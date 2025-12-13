import type { Observable } from 'rxjs';

import type { TCollisionCheckResult } from './TCollisionCheckResult';
import type { TCollisionsData } from './TCollisionsData';
import type { TCollisionsMethods } from './TCollisionsMethods';

export type TWithCollisions = Readonly<{
  collisions: Readonly<{ data: TCollisionsData }> &
    Readonly<{
      value$: Observable<TCollisionCheckResult>;
      destroy: () => void;
    }> &
    TCollisionsMethods;
}>;
