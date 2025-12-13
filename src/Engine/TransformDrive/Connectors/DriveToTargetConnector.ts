import type { Subscription } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TDriveToTargetConnector, TTransformDrive, TWithTransforms } from '@/Engine/TransformDrive/Models';

export function DriveToTargetConnector<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(drive: TTransformDrive<T>, target: TWithTransforms): TDriveToTargetConnector {
  const positionSub$: Subscription = drive.position$.subscribe((position: Vector3): Vector3 => target.position.copy(position));
  const rotationSub$: Subscription = drive.rotation$.subscribe((rotation: Euler): Euler => target.rotation.copy(rotation));
  const scaleSub$: Subscription = drive.scale$.subscribe((scale: Vector3): Vector3 => target.scale.copy(scale));

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
