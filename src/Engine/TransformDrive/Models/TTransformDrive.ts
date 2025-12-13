import type { BehaviorSubject, ReplaySubject } from 'rxjs';

import type { TDestroyable, TNoSpread, TWithId } from '@/Engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TTransformDriveCompatibleEntity = Partial<Record<TransformAgent, TAbstractTransformAgent>>;
export type TTransformDrive<T extends TTransformDriveCompatibleEntity> = TTransformDriveMandatoryFields & T & TNoSpread & TDestroyable;

export type TTransformDriveMandatoryFields = Readonly<{
  agent$: BehaviorSubject<TransformAgent>;
  activeAgent$: ReplaySubject<TAbstractTransformAgent>;
  getActiveAgent: () => TAbstractTransformAgent;
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyQuaternion>;
  scale$: BehaviorSubject<TReadonlyVector3>;
}> &
  TWithId;
