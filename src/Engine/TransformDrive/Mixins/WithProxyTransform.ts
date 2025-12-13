import type { TMovableXYZ, TRotatable, TScaleMixin, TWithPosition3dProperty, TWithRotationProperty, TWithScaleProperty } from '@/Engine/Mixins';
import { withMoveBy3dMixin, withRotationByXyzMixin, withScaleMixin } from '@/Engine/Mixins';
import type { TAbstractTransformAgent } from '@/Engine/TransformDrive/Models';

export function withProxyTransform(
  abstractTransformAgent: TAbstractTransformAgent,
  proxyPositionObj: TWithPosition3dProperty,
  proxyRotationObj: TWithRotationProperty,
  proxyScaleObj: TWithScaleProperty
): TMovableXYZ & TScaleMixin & TRotatable {
  const { getX, getZ, getY } = withMoveBy3dMixin(proxyPositionObj);
  const { getScaleX, getScaleY, getScaleZ } = withScaleMixin(proxyScaleObj);
  const { getRotationX, getRotationY, getRotationZ } = withRotationByXyzMixin(proxyRotationObj);

  return {
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
    }
  };
}
