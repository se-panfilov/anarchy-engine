import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Vector3 } from 'three';

import type { TDestroyable, TWithPosition3dProperty, TWithRotationProperty, TWithScaleProperty } from '@/Engine/Mixins';
import { destroyableMixin, withMoveBy3dMixin, withRotationMixin, withScaleMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import { withMutablePositionConnector } from '@/Engine/TransformDrive/Mixins';
import { withMutableRotationConnector } from '@/Engine/TransformDrive/Mixins/WithMutableRotationConnector';
import { withMutableScaleConnector } from '@/Engine/TransformDrive/Mixins/WithMutableScaleConnector';
import type { TInstantTransformDriver, TTransformDriveParams } from '@/Engine/TransformDrive/Models';
import type { TWithUndefined } from '@/Engine/Utils';
import { updateSubjOnChange } from '@/Engine/Utils';

export function InstantTransformDriver(params: TTransformDriveParams): TInstantTransformDriver {
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.position);
  const rotation$: BehaviorSubject<TReadonlyEuler> = new BehaviorSubject<TReadonlyEuler>(params.rotation);
  const scale$: BehaviorSubject<TReadonlyVector3 | undefined> = new BehaviorSubject<TReadonlyVector3 | undefined>(params.scale);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    //Complete subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
  });

  const positionObj: TWithPosition3dProperty = { position: position$.value.clone() };
  const rotationObj: TWithRotationProperty = { rotation: rotation$.value.clone() };
  const scaleObj: TWithScaleProperty = { scale: scale$.value?.clone() ?? new Vector3(1, 1, 1) };

  const proxyPositionObj: TWithPosition3dProperty = updateSubjOnChange(positionObj, 'position', position$, (value: TReadonlyVector3): TReadonlyVector3 => value.clone());
  const proxyRotationObj: TWithRotationProperty = updateSubjOnChange(rotationObj, 'rotation', rotation$, (value: TReadonlyEuler): TReadonlyEuler => value.clone());
  const proxyScaleObj: TWithScaleProperty = updateSubjOnChange(
    scaleObj as TWithUndefined<TWithScaleProperty>,
    'scale',
    scale$,
    (value: TReadonlyVector3 | undefined): TReadonlyVector3 | undefined => value?.clone() ?? undefined
  ) as TWithScaleProperty;

  return {
    ...destroyable,
    position$,
    rotation$,
    scale$,
    ...withMoveBy3dMixin(proxyPositionObj),
    ...withRotationMixin(proxyRotationObj),
    ...withScaleMixin(proxyScaleObj),
    ...withMutablePositionConnector(position$),
    ...withMutableRotationConnector(rotation$),
    ...withMutableScaleConnector(scale$)
  };
}
