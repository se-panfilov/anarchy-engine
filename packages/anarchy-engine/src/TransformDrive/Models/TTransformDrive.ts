import type { TDestroyable, TNoSpread, TSerializable, TWithId, TWithName } from '@hellpig/anarchy-engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';
import type { TransformAgent } from '@hellpig/anarchy-engine/TransformDrive/Constants';
import type { TTransformDriveSerializedData } from '@hellpig/anarchy-engine/TransformDrive/Models/TTransformDriveSerializedData';
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
