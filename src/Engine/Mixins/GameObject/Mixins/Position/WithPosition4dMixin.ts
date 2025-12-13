import type { IWithPosition4d, IWithPosition4dProperty } from '@/Engine/Mixins/GameObject/Models';
import { isVector4Wrapper } from '@/Engine/Utils';
import type { IVector4Wrapper } from '@/Engine/Wrappers';
import { Vector4Wrapper } from '@/Engine/Wrappers';

export function withPosition4dMixin(entity: IWithPosition4dProperty): IWithPosition4d {
  const setPosition = (position: IVector4Wrapper): IVector4Wrapper => {
    if (!isVector4Wrapper(position)) throw new Error('Trying to set up Vector4 with Vector3 or Vector2');
    return Vector4Wrapper(entity.position.set(position.getX(), position.getY(), position.getZ(), position.getW()));
  };

  const getPosition = (): IVector4Wrapper => Vector4Wrapper(entity.position);
  return { setPosition, getPosition };
}
