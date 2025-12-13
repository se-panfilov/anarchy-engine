import type { Subject, Subscription } from 'rxjs';
import type { Quaternion, Vector3 } from 'three';

import type { TWithPosition3dProperty, TWithQuaternionRotationProperty, TWithScaleProperty } from '@/Mixins';
import type { TReadonlyQuaternion, TReadonlyVector3 } from '@/ThreeLib';
import { TransformAgent } from '@/TransformDrive/Constants';
import { withProxyTransform } from '@/TransformDrive/Mixins';
import type { TAbstractTransformAgent, TDefaultTransformAgent, TTransformAgentParams } from '@/TransformDrive/Models';
import { updateSubjOnChange } from '@/Utils';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function DefaultTransformAgent(params: TTransformAgentParams): TDefaultTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Default);

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  const positionObj: TWithPosition3dProperty = { position: abstractTransformAgent.position$.value.clone() };
  const rotationObj: TWithQuaternionRotationProperty = { rotation: abstractTransformAgent.rotation$.value.clone() };
  const scaleObj: TWithScaleProperty = { scale: abstractTransformAgent.scale$.value.clone() };

  const proxyPositionObj: TWithPosition3dProperty = updateSubjOnChange(
    positionObj,
    'position',
    abstractTransformAgent.position$ as unknown as Subject<Vector3>,
    (value: TReadonlyVector3): Vector3 => value.clone()
  );
  const proxyRotationObj: TWithQuaternionRotationProperty = updateSubjOnChange(
    rotationObj,
    'rotation',
    abstractTransformAgent.rotation$ as unknown as Subject<Quaternion>,
    (value: TReadonlyQuaternion): Quaternion => value.clone()
  );
  const proxyScaleObj: TWithScaleProperty = updateSubjOnChange(
    scaleObj,
    'scale',
    abstractTransformAgent.scale$ as unknown as Subject<Vector3>,
    (value: TReadonlyVector3): Vector3 => value.clone()
  ) as TWithScaleProperty;

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractTransformAgent, {
    ...withProxyTransform(abstractTransformAgent, proxyPositionObj, proxyRotationObj, proxyScaleObj),
    setPosition: (position: TReadonlyVector3): void => abstractTransformAgent.position$.next(position),
    setRotation: (rotation: TReadonlyQuaternion): void => abstractTransformAgent.rotation$.next(rotation),
    setScale: (scale: TReadonlyVector3): void => abstractTransformAgent.scale$.next(scale)
  });
}
