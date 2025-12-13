import type { TVector3OrEuler } from '@Engine/ThreeLib';
import type { TWithMutableScaleConnector } from '@Engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@Engine/TransformDrive/Utils';
import type { BehaviorSubject } from 'rxjs';

export function withMutableScaleConnector<T extends TVector3OrEuler>(scale$: BehaviorSubject<T>): TWithMutableScaleConnector {
  return { scaleConnector: getXyzUpdateProxy(scale$.value.clone(), scale$) };
}
