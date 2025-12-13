import type { BehaviorSubject } from 'rxjs';

import type { TVector3OrEuler } from '@/ThreeLib';
import type { TWithMutableScaleConnector } from '@/TransformDrive/Models';
import { getXyzUpdateProxy } from '@/TransformDrive/Utils';

export function withMutableScaleConnector<T extends TVector3OrEuler>(scale$: BehaviorSubject<T>): TWithMutableScaleConnector {
  return { scaleConnector: getXyzUpdateProxy(scale$.value.clone(), scale$) };
}
