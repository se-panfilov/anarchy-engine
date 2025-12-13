import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Vector3 } from 'three';

import type { TActorParams, TInstantActorDriver } from '@/Engine/Actor/Models';
import type { TDestroyable, TWithPosition3dProperty, TWithRotationProperty, TWithScaleProperty } from '@/Engine/Mixins';
import { destroyableMixin, withMoveBy3dMixin, withRotationMixin, withScaleMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWithUndefined } from '@/Engine/Utils';
import { updateSubjOnChange } from '@/Engine/Utils';

export function InstantActorDriver(params: TActorParams): TInstantActorDriver {
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

  const proxyTransformObj: TWithPosition3dProperty = updateSubjOnChange(positionObj, 'position', position$, (value: TReadonlyVector3): TReadonlyVector3 => value.clone());
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
    ...withMoveBy3dMixin(proxyTransformObj),
    ...withRotationMixin(proxyRotationObj),
    ...withScaleMixin(proxyScaleObj)
  };
}
