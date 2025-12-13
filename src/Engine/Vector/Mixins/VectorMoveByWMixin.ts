import type { Vector4 } from 'three';

import type { TVectorWithW } from '@/Engine/Vector/Models';

export function vectorMoveByWMixin(entity: Vector4): TVectorWithW {
  // eslint-disable-next-line functional/immutable-data
  const setW = (w: number): number => (entity.w = w);
  const getW = (): number => entity.w;
  // eslint-disable-next-line functional/immutable-data
  const addW = (w: number): number => (entity.w += w);

  return { addW, setW, getW };
}
