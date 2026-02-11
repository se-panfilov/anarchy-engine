import type { TDestroyable, TNoSpread, TSerializable, TWithId, TWithName } from '@Anarchy/Engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import type { TTransformDriveSerializedData } from '@Anarchy/Engine/TransformDrive/Models/TTransformDriveSerializedData';
import type { BehaviorSubject, ReplaySubject } from 'rxjs';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TTransformDriveCompatibleEntity = Partial<Record<TransformAgent, TAbstractTransformAgent>>;
export type TTransformDrive<T extends TTransformDriveCompatibleEntity> = TTransformDriveMandatoryFields & T & TSerializable<TTransformDriveSerializedData> & TNoSpread & TDestroyable & TWithName;

export type TTransformDriveMandatoryFields = Readonly<{
  agent$: BehaviorSubject<TransformAgent>;
  activeAgent$: ReplaySubject<TAbstractTransformAgent>;
  getActiveAgent: () => TAbstractTransformAgent;
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyQuaternion>;
  scale$: BehaviorSubject<TReadonlyVector3>;
  relatedEntityId: string;
}> &
  TWithId;
