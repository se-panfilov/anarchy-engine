import type { TEulerWrapper } from '@/Engine/Euler';
import { EulerWrapper } from '@/Engine/Euler';
import type { TScalable, TWithScale } from '@/Engine/Mixins/GameObjects/Models';

export function scalableMixin(entity: TWithScale): TScalable {
  const setScale = (x: number, y: number, z: number): TEulerWrapper => EulerWrapper(entity.scale.set(x, y, z));
  const getScale = (): TEulerWrapper => EulerWrapper(entity.scale);

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
    setScale,
    getScale,
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
