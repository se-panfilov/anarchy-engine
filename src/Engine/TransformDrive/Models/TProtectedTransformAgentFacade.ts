import type { Observable } from 'rxjs';

import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TProtectedTransformAgentFacade<T extends TAbstractTransformAgent> = Omit<T, 'position$' | 'rotation$' | 'scale$'> &
  Readonly<{
    position$: Observable<TReadonlyVector3>;
    rotation$: Observable<TReadonlyQuaternion>;
    scale$: Observable<TReadonlyVector3>;
  }>;
