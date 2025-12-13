import type { BehaviorSubject } from 'rxjs';

import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TAbstractIntersectionsWatcher } from './TAbstractIntersectionsWatcher';

export type TIntersectionsDirectionWatcher = TAbstractIntersectionsWatcher &
  Readonly<{
    origin$: BehaviorSubject<TReadonlyVector3>;
    direction$: BehaviorSubject<TReadonlyVector3>;
  }>;
