import type { TVector3OrEuler, TVector4OrQuaternion } from '@Anarchy/Engine/ThreeLib';
import type { TWithMutableRotationConnector } from '@Anarchy/Engine/TransformDrive/Models';
import { getXyzUpdateProxy, getXyzwUpdateProxy } from '@Anarchy/Engine/TransformDrive/Utils/ActorDriveUtils';
import type { BehaviorSubject } from 'rxjs';

export function withMutableRotationConnector<T1 extends TVector3OrEuler, T2 extends TVector4OrQuaternion>(rotation$: BehaviorSubject<T1 | T2>): TWithMutableRotationConnector {
  return {
    rotationEulerConnector: getXyzUpdateProxy(rotation$.value.clone(), rotation$),
    rotationQuaternionConnector: getXyzwUpdateProxy((rotation$ as BehaviorSubject<T2>).value.clone(), rotation$ as BehaviorSubject<T2>)
  };
}
