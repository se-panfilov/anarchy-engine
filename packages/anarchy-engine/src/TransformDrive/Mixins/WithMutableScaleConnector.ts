import type { TVector3OrEuler } from '@Anarchy/Engine/ThreeLib';
import type { TWithMutableScaleConnector } from '@Anarchy/Engine/TransformDrive/Models';
import { getXyzUpdateProxy } from '@Anarchy/Engine/TransformDrive/Utils/ActorDriveUtils';
import type { BehaviorSubject } from 'rxjs';

export function withMutableScaleConnector<T extends TVector3OrEuler>(scale$: BehaviorSubject<T>): TWithMutableScaleConnector {
  return { scaleConnector: getXyzUpdateProxy(scale$.value.clone(), scale$) };
}
