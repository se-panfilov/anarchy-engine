import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TProtectedTransformAgentFacade<T extends TAbstractTransformAgent> = Omit<T, 'position$' | 'rotation$' | 'scale$'> &
  Readonly<{
    position$: Observable<Vector3>;
    rotation$: Observable<Euler>;
    scale$: Observable<Vector3>;
  }>;
