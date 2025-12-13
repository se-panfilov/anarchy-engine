import type { Subscription } from 'rxjs';
import { Vector3 } from 'three/src/math/Vector3';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TDriveToTargetConnector, TOffsets, TTransformDrive } from '@/Engine/TransformDrive/Models';
import { isNotDefined } from '@/Engine/Utils';

export function DriveToAudio3dConnector<T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(
  drive: TTransformDrive<T>,
  target: Readonly<{ pos: (x: number, y?: number, z?: number, id?: number) => SpatialPosition }>,
  offsets?: TOffsets
): TDriveToTargetConnector {
  const { positionOffset } = offsets ?? {};

  const positionSub$: Subscription = drive.position$.subscribe((position: TReadonlyVector3): SpatialPosition => {
    if (isNotDefined(positionOffset)) return target.pos(position.x, position.y, position.z);
    const vector: Vector3 = new Vector3(position.x, position.y, position.z).add(positionOffset);
    return target.pos(vector.x, vector.y, vector.z);
  });

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Finish subscriptions
    destroySub$.unsubscribe();
    positionSub$.unsubscribe();
  });

  return {
    ...destroyable
  };
}
