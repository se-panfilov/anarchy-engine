import { Vector3 } from 'three/src/math/Vector3';

import type { TWithPosition3d, TWithPosition3dProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withPosition3dMixin(entity: TWithPosition3dProperty): TWithPosition3d {
  const setPosition = (position: Vector3): Vector3 => entity.position.set(position.x, position.y, position.z);
  const addPosition = (position: Vector3): Vector3 => setPosition(new Vector3(entity.position.x + position.x, entity.position.y + position.y, entity.position.z + position.z));
  const getPosition = (): Vector3 => new Vector3(entity.position.x, entity.position.y, entity.position.z);
  return { setPosition, addPosition, getPosition };
}
