import type { TScaleMixin, TWithScaleProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withScaleMixin(entity: TWithScaleProperty): TScaleMixin {
  const setScaleX = (x: number): void => void entity.scale.set(x, entity.scale.y, entity.scale.z);
  const getScaleX = (): number => entity.scale.x;

  const setScaleY = (y: number): void => void entity.scale.set(entity.scale.x, y, entity.scale.z);
  const getScaleY = (): number => entity.scale.y;

  const setScaleZ = (z: number): void => void entity.scale.set(entity.scale.x, entity.scale.y, z);
  const getScaleZ = (): number => entity.scale.z;

  const adjustScaleByX = (x: number): void => void entity.scale.set(entity.scale.x + x, entity.scale.y, entity.scale.z);
  const adjustScaleByY = (y: number): void => void entity.scale.set(entity.scale.x, entity.scale.y + y, entity.scale.z);
  const adjustScaleByZ = (z: number): void => void entity.scale.set(entity.scale.x, entity.scale.y, entity.scale.z + z);

  return {
    setScaleX,
    getScaleX,
    setScaleY,
    getScaleY,
    setScaleZ,
    getScaleZ,
    adjustScaleByX,
    adjustScaleByY,
    adjustScaleByZ
  };
}
