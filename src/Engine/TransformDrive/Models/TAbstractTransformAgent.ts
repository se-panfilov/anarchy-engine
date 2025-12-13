import type { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable, TWithId } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TReadonlyTransform } from './TReadonlyTransform';

export type TAbstractTransformAgent = Readonly<{
  type: TransformAgent;
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyEuler>;
  scale$: BehaviorSubject<TReadonlyVector3>;
  enabled$: BehaviorSubject<boolean>;
  onActivated$: Subject<TReadonlyTransform>;
  onDeactivated$: Subject<TReadonlyTransform>;
}> &
  TWithId &
  TDestroyable;
