import type { IRotatable, IWithRotation } from '@/Engine/Mixins/GameObject/Models';
import type { IEulerWrapper } from '@/Engine/Wrappers';
import { EulerWrapper } from '@/Engine/Wrappers';

export function rotatableMixin(entity: IWithRotation): IRotatable {
  const setRotation = (x: number, y: number, z: number): IEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  return { setRotation };
}
