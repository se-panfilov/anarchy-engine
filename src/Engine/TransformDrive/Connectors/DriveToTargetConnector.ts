import type { Subscription } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TActorModel3dSettings } from '@/Engine/Actor/Models';
import { applyRotationOffsetWithReorder } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TDriveToTargetConnector, TTransformDrive, TWithTransforms } from '@/Engine/TransformDrive/Models';
import { isNotDefined } from '@/Engine/Utils';

export function DriveToTargetConnector<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(
  drive: TTransformDrive<T>,
  target: TWithTransforms,
  model3dSettings?: TActorModel3dSettings
): TDriveToTargetConnector {
  const { positionOffset, rotationOffset, scaleOffset } = model3dSettings ?? {};

  const positionSub$: Subscription = drive.position$.subscribe((position: Vector3): Vector3 => {
    if (isNotDefined(positionOffset)) return target.position.copy(position);
    return target.position.copy(position).add(positionOffset);
  });

  const rotationSub$: Subscription = drive.rotation$.subscribe((rotation: Euler): Euler | void => {
    if (isNotDefined(rotationOffset)) return target.rotation.copy(rotation);
    return applyRotationOffsetWithReorder(target.rotation, rotation, rotationOffset);
  });

  const scaleSub$: Subscription = drive.scale$.subscribe((scale: Vector3): Vector3 => {
    if (isNotDefined(scaleOffset)) return target.scale.copy(scale);
    return target.scale.copy(scale).add(scaleOffset);
  });

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Finish subscriptions
    destroySub$.unsubscribe();
    positionSub$.unsubscribe();
    rotationSub$.unsubscribe();
    scaleSub$.unsubscribe();
  });

  return {
    ...destroyable
  };
}
