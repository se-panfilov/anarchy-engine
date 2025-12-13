import type { Vector2, Vector3 } from 'three';

import type { IVectorWithY } from '@/Engine/Wrappers/Vector2Wrapper/Models';

export function vectorMoveByYMixin(entity: Vector2 | Vector3): IVectorWithY {
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.y = y);
  const getY = (): number => entity.y;
  // eslint-disable-next-line functional/immutable-data
  const addY = (y: number): number => (entity.y += y);

  return { addY, setY, getY };
}
