import type { BehaviorSubject, ReplaySubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable, TWithId } from '@/Engine/Mixins';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TProtectedTransformAgentFacade } from './TProtectedTransformAgentFacade';

export type TTransformDrive<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>> = TTransformDriveMandatoryFields & T & TDestroyable;

export type TTransformDriveMandatoryFields = Readonly<{
  agent$: BehaviorSubject<TransformAgent>;
  activeAgent$: ReplaySubject<TProtectedTransformAgentFacade<TAbstractTransformAgent>>;
  getActiveAgent: () => TProtectedTransformAgentFacade<TAbstractTransformAgent>;
  position$: ReplaySubject<Vector3>;
  getPosition: () => Vector3;
  rotation$: ReplaySubject<Euler>;
  getRotation: () => Euler;
  scale$: ReplaySubject<Vector3>;
  getScale: () => Vector3;
}> &
  TWithId;
