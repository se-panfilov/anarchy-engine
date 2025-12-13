import type { IWithPosition, IWithPositionProperty } from '@/Engine/Mixins/GameObject/Models';
import type { IVector3Wrapper } from '@/Engine/Wrappers';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function withPositionMixin(entity: IWithPositionProperty): IWithPosition {
  const setPosition = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));
  const getPosition = (): IVector3Wrapper => Vector3Wrapper(entity.position);
  return { setPosition, getPosition };
}
