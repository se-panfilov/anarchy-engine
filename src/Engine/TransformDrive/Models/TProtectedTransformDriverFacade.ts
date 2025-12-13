import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TAbstractTransformDriver } from './TAbstractTransformDriver';

export type TProtectedTransformDriverFacade<T extends TAbstractTransformDriver> = Omit<T, 'position$' | 'rotation$' | 'scale$'> &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
    scale$: Observable<Vector3 | undefined>;
  }>;
