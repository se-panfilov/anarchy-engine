import type { Vector2, Vector3, Vector4 } from 'three';

import type { IVectorWithX } from '@/Engine/Wrappers/Vector2Wrapper/Models';

export function vectorMoveByXMixin(entity: Vector2 | Vector3 | Vector4): IVectorWithX {
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.x = x);
  const getX = (): number => entity.x;
  // eslint-disable-next-line functional/immutable-data
  const addX = (x: number): number => (entity.x += x);

  return { addX, setX, getX };
}
