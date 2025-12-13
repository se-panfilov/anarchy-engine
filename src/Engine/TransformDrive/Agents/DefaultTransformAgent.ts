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

  const { getX, getZ, getY } = withMoveBy3dMixin(proxyPositionObj);
  const { getScaleX, getScaleY, getScaleZ } = withScaleMixin(proxyScaleObj);
  const { getRotationX, getRotationY, getRotationZ } = withRotationByXyzMixin(proxyRotationObj);

  return {
    ...abstractTransformAgent,
    getX,
    getY,
    getZ,
    getScaleX,
    getScaleY,
    getScaleZ,
    getRotationX,
    getRotationY,
    getRotationZ,
    setX: (x: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyPositionObj.position.x = x;
      abstractTransformAgent.position$.next(proxyPositionObj.position);
      return x;
    },
    setY: (y: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyPositionObj.position.y = y;
      abstractTransformAgent.position$.next(proxyPositionObj.position);
      return y;
    },
    setZ: (z: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyPositionObj.position.z = z;
      abstractTransformAgent.position$.next(proxyPositionObj.position);
      return z;
    },
    addX: (x: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyPositionObj.position.x += x;
      abstractTransformAgent.position$.next(proxyPositionObj.position);
      return proxyPositionObj.position.x;
    },
    addY: (y: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyPositionObj.position.y += y;
      abstractTransformAgent.position$.next(proxyPositionObj.position);
      return proxyPositionObj.position.y;
    },
    addZ: (z: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyPositionObj.position.z += z;
      abstractTransformAgent.position$.next(proxyPositionObj.position);
      return proxyPositionObj.position.z;
    },
    setRotationX: (x: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyRotationObj.rotation.x = x;
      abstractTransformAgent.rotation$.next(proxyRotationObj.rotation);
      return x;
    },
    setRotationY: (y: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyRotationObj.rotation.y = y;
      abstractTransformAgent.rotation$.next(proxyRotationObj.rotation);
      return y;
    },
    setRotationZ: (z: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyRotationObj.rotation.z = z;
      abstractTransformAgent.rotation$.next(proxyRotationObj.rotation);
      return z;
    },
    adjustRotationByX: (x: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyRotationObj.rotation.x += x;
      abstractTransformAgent.rotation$.next(proxyRotationObj.rotation);
      return proxyRotationObj.rotation.x;
    },
    adjustRotationByY: (y: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyRotationObj.rotation.y += y;
      abstractTransformAgent.rotation$.next(proxyRotationObj.rotation);
      return proxyRotationObj.rotation.y;
    },
    adjustRotationByZ: (z: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyRotationObj.rotation.z += z;
      abstractTransformAgent.rotation$.next(proxyRotationObj.rotation);
      return proxyRotationObj.rotation.z;
    },
    setScaleX: (x: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyScaleObj.scale.x = x;
      abstractTransformAgent.scale$.next(proxyScaleObj.scale);
      return x;
    },
    setScaleY: (y: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyScaleObj.scale.y = y;
      abstractTransformAgent.scale$.next(proxyScaleObj.scale);
      return y;
    },
    setScaleZ: (z: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyScaleObj.scale.z = z;
      abstractTransformAgent.scale$.next(proxyScaleObj.scale);
      return z;
    },
    adjustScaleByX: (x: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyScaleObj.scale.x += x;
      abstractTransformAgent.scale$.next(proxyScaleObj.scale);
      return proxyScaleObj.scale.x;
    },
    adjustScaleByY: (y: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyScaleObj.scale.y += y;
      abstractTransformAgent.scale$.next(proxyScaleObj.scale);
      return proxyScaleObj.scale.y;
    },
    adjustScaleByZ: (z: number): number => {
      // eslint-disable-next-line functional/immutable-data
      proxyScaleObj.scale.z += z;
      abstractTransformAgent.scale$.next(proxyScaleObj.scale);
      return proxyScaleObj.scale.z;
    },
    setPosition: (position: Vector3): void => abstractTransformAgent.position$.next(position),
    setRotation: (rotation: Euler): void => abstractTransformAgent.rotation$.next(rotation),
    setScale: (scale: Vector3): void => abstractTransformAgent.scale$.next(scale)
  };
}
