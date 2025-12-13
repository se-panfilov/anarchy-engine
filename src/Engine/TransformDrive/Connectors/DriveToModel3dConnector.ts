import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TModel3d } from '@/Engine/Models3d';
import type { TDriveToModel3dConnector, TTransformDrive } from '@/Engine/TransformDrive/Models';

export function DriveToModel3dConnector(drive: TTransformDrive, model3d: TModel3d): TDriveToModel3dConnector {
  const positionSub$: Subscription = drive.position$.pipe(distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => prev.equals(curr))).subscribe((position: Vector3): void => {
    model3d.getRawModel3d().position.copy(position);
  });

  const rotationSub$: Subscription = drive.rotation$
    .pipe(distinctUntilChanged((prev: Euler, curr: Euler): boolean => prev.equals(curr)))
    .subscribe((rotation: Euler): Euler => model3d.getRawModel3d().rotation.copy(rotation));

  const scaleSub$: Subscription = drive.scale$
    .pipe(distinctUntilChanged((prev: Vector3, curr: Vector3): boolean => prev.equals(curr)))
    .subscribe((scale: Vector3): Vector3 => model3d.getRawModel3d().scale.copy(scale));

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
