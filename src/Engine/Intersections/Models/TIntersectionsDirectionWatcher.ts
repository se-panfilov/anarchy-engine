import type { BehaviorSubject } from 'rxjs';
import type { Vector3Like } from 'three';

import type { TAbstractIntersectionsWatcher } from './TAbstractIntersectionsWatcher';

export type TIntersectionsDirectionWatcher = TAbstractIntersectionsWatcher &
  Readonly<{
    origin$: BehaviorSubject<Readonly<Vector3Like>>;
    direction$: BehaviorSubject<Readonly<Vector3Like>>;
  }>;
