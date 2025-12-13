import type { IWithPosition3d, IWithPosition3dProperty } from '@/Engine/Mixins/GameObject/Models';
import type { IVector3Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withPosition3dMixin(entity: IWithPosition3dProperty): IWithPosition3d {
  const setPosition = (position: IVector3Wrapper): IVector3Wrapper => Vector3Wrapper(entity.position.set(position.getX(), position.getY(), position.getZ()));
  const getPosition = (): IVector3Wrapper => Vector3Wrapper(entity.position);
  return { setPosition, getPosition };
}
