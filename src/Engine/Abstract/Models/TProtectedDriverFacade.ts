import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TAbstractDriver } from './TAbstractDriver';

export type TProtectedDriverFacade<T extends TAbstractDriver> = Omit<T, 'position$' | 'rotation$' | 'scale$'> &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
    scale$: Observable<Vector3 | undefined>;
  }>;
