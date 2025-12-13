import type { Subscription } from 'rxjs';
import type { Euler } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import type { TWithPosition3dProperty, TWithRotationProperty, TWithScaleProperty } from '@/Engine/Mixins';
import { withMoveBy3dMixin, withRotationByXyzMixin, withScaleMixin } from '@/Engine/Mixins';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TDefaultTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';
import { updateSubjOnChange } from '@/Engine/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function DefaultTransformAgent(params: TTransformAgentParams): TDefaultTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Default);

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  const positionObj: TWithPosition3dProperty = { position: abstractTransformAgent.position$.value.clone() };
  const rotationObj: TWithRotationProperty = { rotation: abstractTransformAgent.rotation$.value.clone() };
  const scaleObj: TWithScaleProperty = { scale: abstractTransformAgent.scale$.value.clone() };

  const proxyPositionObj: TWithPosition3dProperty = updateSubjOnChange(positionObj, 'position', abstractTransformAgent.position$, (value: TReadonlyVector3): TReadonlyVector3 => value.clone());
  const proxyRotationObj: TWithRotationProperty = updateSubjOnChange(rotationObj, 'rotation', abstractTransformAgent.rotation$, (value: TReadonlyEuler): TReadonlyEuler => value.clone());
  const proxyScaleObj: TWithScaleProperty = updateSubjOnChange(scaleObj, 'scale', abstractTransformAgent.scale$, (value: TReadonlyVector3): TReadonlyVector3 => value.clone()) as TWithScaleProperty;

  return {
    ...abstractTransformAgent,
    ...withMoveBy3dMixin(proxyPositionObj),
    ...withScaleMixin(proxyScaleObj),
    ...withRotationByXyzMixin(proxyRotationObj),
    setPosition: (position: Vector3): void => abstractTransformAgent.position$.next(position),
    setRotation: (rotation: Euler): void => abstractTransformAgent.rotation$.next(rotation),
    setScale: (scale: Vector3): void => abstractTransformAgent.scale$.next(scale)
  };
}
