import type { IRotatable, IWithRotation } from '@/Engine/Mixins/GameObject/Models';
import type { IEulerWrapper } from '@/Engine/Wrappers';
import { EulerWrapper } from '@/Engine/Wrappers';

export function rotatableMixin(entity: IWithRotation): IRotatable {
  const setRotation = (x: number, y: number, z: number): IEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  const getRotation = (): IEulerWrapper => EulerWrapper(entity.rotation);

  const setRotationX = (x: number): void => void entity.rotation.set(x, entity.rotation.y, entity.rotation.z);
  const getRotationX = (): number => entity.rotation.x;

  const setRotationY = (y: number): void => void entity.rotation.set(entity.rotation.x, y, entity.rotation.z);
  const getRotationY = (): number => entity.rotation.y;

  const setRotationZ = (z: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y, z);
  const getRotationZ = (): number => entity.rotation.z;

  const adjustRotationByX = (x: number): void => void entity.rotation.set(entity.rotation.x + x, entity.rotation.y, entity.rotation.z);
  const adjustRotationByY = (y: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y + y, entity.rotation.z);
  const adjustRotationByZ = (z: number): void => void entity.rotation.set(entity.rotation.x, entity.rotation.y, entity.rotation.z + z);

  return {
    setRotation,
    getRotation,
    setRotationX,
    getRotationX,
    setRotationY,
    getRotationY,
    setRotationZ,
    getRotationZ,
    adjustRotationByX,
    adjustRotationByY,
    adjustRotationByZ
  };
}
