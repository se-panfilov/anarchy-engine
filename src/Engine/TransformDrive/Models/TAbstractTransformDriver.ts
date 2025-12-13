import type { BehaviorSubject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';

export type TAbstractTransformDriver = Readonly<{
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyEuler>;
  scale$: BehaviorSubject<TReadonlyVector3 | undefined>;
}> &
  TDestroyable;
