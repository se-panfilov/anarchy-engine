import type { TWithPosition4d, IWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';
import { isVector4Wrapper } from '@/Engine/Utils';
import type { TVector4Wrapper } from '@/Engine/Vector';
import { Vector4Wrapper } from '@/Engine/Vector';

export function withPosition4dMixin(entity: IWithPosition4dProperty): TWithPosition4d {
  const setPosition = (position: TVector4Wrapper): TVector4Wrapper => {
    if (!isVector4Wrapper(position)) throw new Error('Trying to set up Vector4 with Vector3 or Vector2');
    return Vector4Wrapper(entity.position.set(position.getX(), position.getY(), position.getZ(), position.getW()));
  };

  const getPosition = (): TVector4Wrapper => Vector4Wrapper(entity.position);
  return { setPosition, getPosition };
}
