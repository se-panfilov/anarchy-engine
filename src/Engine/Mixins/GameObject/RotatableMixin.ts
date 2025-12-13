import type { IRotatable, IWithRotation } from '@/Engine/Mixins/GameObject/Models';
import type { IEulerWrapper } from '@/Engine/Wrappers';
import { EulerWrapper } from '@/Engine/Wrappers';

export function rotatableMixin(entity: IWithRotation): IRotatable {
  const setRotation = (x: number, y: number, z: number): IEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  const getRotation = (): IEulerWrapper => EulerWrapper(entity.rotation);

  function setRotationX(x: number): void {
    entity.rotation.set(x, entity.rotation.y, entity.rotation.z);
  }

  const getRotationX = (): number => entity.rotation.x;

  function setRotationY(y: number): void {
    entity.rotation.set(entity.rotation.x, y, entity.rotation.z);
  }

  const getRotationY = (): number => entity.rotation.y;

  function setRotationZ(z: number): void {
    entity.rotation.set(entity.rotation.x, entity.rotation.y, z);
  }

  const getRotationZ = (): number => entity.rotation.z;

  function adjustRotationByX(x: number): void {
    entity.rotation.set(entity.rotation.x + x, entity.rotation.y, entity.rotation.z);
  }

  function adjustRotationByY(y: number): void {
    entity.rotation.set(entity.rotation.x, entity.rotation.y + y, entity.rotation.z);
  }

  function adjustRotationByZ(z: number): void {
    entity.rotation.set(entity.rotation.x, entity.rotation.y, entity.rotation.z + z);
  }

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
