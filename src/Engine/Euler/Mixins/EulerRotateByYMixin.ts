import type { Euler } from 'three';

import type { TEulerWithY } from '@/Engine/Euler/Models';

export function eulerRotateByYMixin(entity: Euler): TEulerWithY {
  // eslint-disable-next-line functional/immutable-data
  const setRotationY = (y: number): number => (entity.y = y);
  const getRotationY = (): number => entity.y;
  // eslint-disable-next-line functional/immutable-data
  const adjustRotationByY = (y: number): number => (entity.y += y);

  return { adjustRotationByY, setRotationY, getRotationY };
}
