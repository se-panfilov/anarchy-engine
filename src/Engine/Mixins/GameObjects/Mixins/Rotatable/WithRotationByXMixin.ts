import type { TRotatableX, TWithQuaternionRotationProperty, TWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withRotationByXMixin(entity: TWithRotationProperty): TRotatableX {
  const setRotationX = (x: number): void => void entity.rotation.set(x, entity.rotation.y, entity.rotation.z);
  const getRotationX = (): number => entity.rotation.x;
  const adjustRotationByX = (x: number): void => void entity.rotation.set(entity.rotation.x + x, entity.rotation.y, entity.rotation.z);

  return {
    setRotationX,
    getRotationX,
    adjustRotationByX
  };
}

export function withQuaternionRotationByXMixin(entity: TWithQuaternionRotationProperty): TRotatableX {
  const setRotationX = (x: number): void => void entity.rotation.set(x, entity.rotation.y, entity.rotation.z, entity.rotation.w);
  const getRotationX = (): number => entity.rotation.x;
  const adjustRotationByX = (x: number): void => void entity.rotation.set(entity.rotation.x + x, entity.rotation.y, entity.rotation.z, entity.rotation.w);

  return {
    setRotationX,
    getRotationX,
    adjustRotationByX
  };
}
