import type { TVector3OrEuler } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithMutableScaleConnector } from '@hellpig/anarchy-engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@hellpig/anarchy-engine/TransformDrive/Utils/ActorDriveUtils';
import type { BehaviorSubject } from 'rxjs';

export function withMutableScaleConnector<T extends TVector3OrEuler>(scale$: BehaviorSubject<T>): TWithMutableScaleConnector {
  return { scaleConnector: getXyzUpdateProxy(scale$.value.clone(), scale$) };
}
