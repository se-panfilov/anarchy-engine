import type { BehaviorSubject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

export type TAbstractTransformAgent = Readonly<{
  // TODO 8.0.0. MODELS: extract id as TWithId (everywhere)
  id: string;
  type: TransformAgent;
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyEuler>;
  scale$: BehaviorSubject<TReadonlyVector3>;
  enabled$: BehaviorSubject<boolean>;
}> &
  TDestroyable;
