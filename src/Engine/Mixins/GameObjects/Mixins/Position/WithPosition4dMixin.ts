import type { TWithPosition4d, TWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';
import { isVector4Wrapper } from '@/Engine/Utils';
import type { TVector4, TVector4Wrapper } from '@/Engine/Vector';
import { Vector4Wrapper } from '@/Engine/Vector';

export function withPosition4dMixin(entity: TWithPosition4dProperty): TWithPosition4d {
  const setPosition = (position: TVector4Wrapper): TVector4 => {
    if (!isVector4Wrapper(position)) throw new Error('Trying to set up Vector4 with Vector3 or Vector2');
    return entity.position.set(position.getX(), position.getY(), position.getZ(), position.getW());
  };

  const addPosition = (position: TVector4Wrapper): TVector4 => {
    if (!isVector4Wrapper(position)) throw new Error('Trying to set up Vector4 with Vector3 or Vector2');
    return setPosition(
      Vector4Wrapper({
        x: entity.position.x + position.getX(),
        y: entity.position.y + position.getY(),
        z: entity.position.z + position.getZ(),
        w: entity.position.w + position.getW()
      })
    );
  };

  const getPosition = (): TVector4Wrapper => Vector4Wrapper(entity.position);
  return { setPosition, addPosition, getPosition };
}
