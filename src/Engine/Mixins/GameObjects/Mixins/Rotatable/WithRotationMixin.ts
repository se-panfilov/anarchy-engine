import type { IEulerWrapper } from '@/Engine/Euler';
import { EulerWrapper } from '@/Engine/Euler';
import type { IWithRotation, IWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withRotationMixin(entity: IWithRotationProperty): IWithRotation {
  const setRotation = (x: number, y: number, z: number): IEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  const getRotation = (): IEulerWrapper => EulerWrapper(entity.rotation);
  return {
    setRotation,
    getRotation
  };
}
