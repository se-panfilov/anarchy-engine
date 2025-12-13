import type { BehaviorSubject, ReplaySubject } from 'rxjs';

import type { TDestroyable, TWithId } from '@/Engine/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TTransformDrive<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>> = TTransformDriveMandatoryFields & T & TDestroyable;

export type TTransformDriveMandatoryFields = Readonly<{
  agent$: BehaviorSubject<TransformAgent>;
  activeAgent$: ReplaySubject<TProtectedTransformAgentFacade<TAbstractTransformAgent>>;
  getActiveAgent: () => TProtectedTransformAgentFacade<TAbstractTransformAgent>;
  position$: BehaviorSubject<TReadonlyVector3>;
  rotation$: BehaviorSubject<TReadonlyQuaternion>;
  scale$: BehaviorSubject<TReadonlyVector3>;
}> &
  TWithId;
