import type { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable, TNoSpread, TSerializable, TWithId } from '@/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/ThreeLib';
import type { TransformAgent } from '@/TransformDrive/Constants';

import type { TReadonlyTransform } from './TReadonlyTransform';

export type TAbstractTransformAgent = Readonly<{
  type: TransformAgent;
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyQuaternion>;
  scale$: BehaviorSubject<TReadonlyVector3>;
  enabled$: BehaviorSubject<boolean>;
  onActivated$: Subject<TReadonlyTransform>;
  onDeactivated$: Subject<TReadonlyTransform>;
  relatedDriveId$: BehaviorSubject<string | undefined>;
}> &
  TWithId &
  TNoSpread &
  TSerializable<any> &
  TDestroyable;
