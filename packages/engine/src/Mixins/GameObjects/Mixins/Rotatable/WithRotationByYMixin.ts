import type { TRotatableY, TWithQuaternionRotationProperty, TWithRotationProperty } from '@/Mixins/GameObjects/Models';

export function withRotationByYMixin(entity: TWithRotationProperty): TRotatableY {
  const setRotationY = (y: number): void => void entity.rotation.set(y, entity.rotation.y, entity.rotation.z);
  const getRotationY = (): number => entity.rotation.y;
  const adjustRotationByY = (y: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y + y, entity.rotation.z);

  return {
    setRotationY,
    getRotationY,
    adjustRotationByY
  };
}

export function withQuaternionRotationByYMixin(entity: TWithQuaternionRotationProperty): TRotatableY {
  const setRotationY = (y: number): void => void entity.rotation.set(y, entity.rotation.y, entity.rotation.z, entity.rotation.w);
  const getRotationY = (): number => entity.rotation.y;
  const adjustRotationByY = (y: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y + y, entity.rotation.z, entity.rotation.w);

  return {
    setRotationY,
    getRotationY,
    adjustRotationByY
  };
}
