import type { Subscription } from 'rxjs';
import { Euler } from 'three';

import type { TReadonlyEuler, TReadonlyQuaternion, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TDriveToTargetConnector, TOffsets, TTransformDrive, TWithTransforms } from '@/Engine/TransformDrive/Models';
import { isNotDefined } from '@/Engine/Utils';

export function DriveToTargetConnector<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(
  drive: TTransformDrive<T>,
  target: TWithTransforms,
  offsets?: TOffsets
): TDriveToTargetConnector {
  const { positionOffset, rotationOffset, scaleOffset } = offsets ?? {};

  const positionSub$: Subscription = drive.position$.subscribe((position: TReadonlyVector3): TReadonlyVector3 => {
    if (isNotDefined(positionOffset)) return target.position.copy(position);
    return target.position.copy(position).add(positionOffset);
  });

  const rotationSub$: Subscription = drive.rotation$.subscribe((rotation: TReadonlyQuaternion): TReadonlyEuler | void => {
    const rotationEuler: Euler = new Euler().setFromQuaternion(rotation.clone());
    if (isNotDefined(rotationOffset)) return target.rotation.copy(rotationEuler);
    return target.rotation.copy(new Euler().setFromQuaternion(rotation.clone().multiply(rotationOffset.clone())));
  });

  const scaleSub$: Subscription = drive.scale$.subscribe((scale: TReadonlyVector3): TReadonlyVector3 => {
    if (isNotDefined(scaleOffset)) return target.scale.copy(scale);
    return target.scale.copy(scale).add(scaleOffset);
  });

  const destroySub$: Subscription = drive.destroy$.subscribe((): void => {
    //Finish subscriptions
    destroySub$.unsubscribe();
    positionSub$.unsubscribe();
    rotationSub$.unsubscribe();
    scaleSub$.unsubscribe();
  });

  return {
    destroy$: drive.destroy$
  };
}
