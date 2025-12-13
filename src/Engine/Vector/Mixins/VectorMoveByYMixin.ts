import type { Vector2, Vector3, Vector4 } from 'three';

import type { TVectorWithY } from '@/Engine/Vector/Models';

export function vectorMoveByYMixin(entity: Vector2 | Vector3 | Vector4): TVectorWithY {
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.y = y);
  const getY = (): number => entity.y;
  // eslint-disable-next-line functional/immutable-data
  const addY = (y: number): number => (entity.y += y);

  return { addY, setY, getY };
}
