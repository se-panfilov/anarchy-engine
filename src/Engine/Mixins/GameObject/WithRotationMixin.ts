import type { IWithRotation, IWithRotationProperty } from '@/Engine/Mixins/GameObject/Models';
import type { IEulerWrapper } from '@/Engine/Wrappers';
import { EulerWrapper } from '@/Engine/Wrappers';

export function withRotationMixin(entity: IWithRotationProperty): IWithRotation {
  const setRotation = (x: number, y: number, z: number): IEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  const getRotation = (): IEulerWrapper => EulerWrapper(entity.rotation);
  return {
    setRotation,
    getRotation
  };
}
