import type { Vector2, Vector3 } from 'three';

import type { IMovableY } from '@/Engine/Mixins';

export function vectorMoveByYMixin(entity: Vector2 | Vector3): Omit<IMovableY, 'setPosition' | 'getPosition'> {
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.y = y);
  const getY = (): number => entity.y;
  // eslint-disable-next-line functional/immutable-data
  const addY = (y: number): number => (entity.y += y);

  return { addY, setY, getY };
}
