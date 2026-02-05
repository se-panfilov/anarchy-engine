import type { TDestroyable, TNoSpread, TSerializable, TWithId } from '@hellpig/anarchy-engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';
import type { TransformAgent } from '@hellpig/anarchy-engine/TransformDrive/Constants';
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
