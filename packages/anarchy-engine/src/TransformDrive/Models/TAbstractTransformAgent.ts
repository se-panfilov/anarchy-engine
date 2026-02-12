import type { TDestroyable, TNoSpread, TSerializable, TWithId } from '@Anarchy/Engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import type { BehaviorSubject, Subject } from 'rxjs';

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
