import { Vector4 } from 'three';

import type { TWithPosition4d, TWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';
import { isVector4 } from '@/Engine/Utils';

export function withPosition4dMixin(entity: TWithPosition4dProperty): TWithPosition4d {
  const setPosition = (position: Vector4): Vector4 => {
    if (!isVector4(position)) throw new Error('Trying to set up Vector4 with Vector3 or Vector2');
    return entity.position.set(position.x, position.y, position.z, position.w);
  };

  const addPosition = (position: Vector4): Vector4 => {
    if (!isVector4(position)) throw new Error('Trying to set up Vector4 with Vector3 or Vector2');
    return setPosition(new Vector4(entity.position.x + position.x, entity.position.y + position.y, entity.position.z + position.z, entity.position.w + position.w));
  };

  const getPosition = (): Vector4 => new Vector4(entity.position.x, entity.position.y, entity.position.z, entity.position.w);
  return { setPosition, addPosition, getPosition };
}
