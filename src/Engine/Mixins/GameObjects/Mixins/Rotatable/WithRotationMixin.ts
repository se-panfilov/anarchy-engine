import type { TEulerWrapper } from '@/Engine/Euler';
import { EulerWrapper } from '@/Engine/Euler';
import type { IWithRotation, IWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withRotationMixin(entity: IWithRotationProperty): IWithRotation {
  const setRotation = (x: number, y: number, z: number): TEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  const getRotation = (): TEulerWrapper => EulerWrapper(entity.rotation);
  return {
    setRotation,
    getRotation
  };
}
