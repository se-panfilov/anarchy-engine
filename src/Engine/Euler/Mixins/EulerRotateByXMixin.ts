import type { Euler } from 'three';

import type { TEulerWithX } from '@/Engine/Euler/Models';

export function eulerRotateByXMixin(entity: Euler): TEulerWithX {
  // eslint-disable-next-line functional/immutable-data
  const setRotationX = (x: number): number => (entity.x = x);
  const getRotationX = (): number => entity.x;
  // eslint-disable-next-line functional/immutable-data
  const adjustRotationByX = (x: number): number => (entity.x += x);

  return { adjustRotationByX, setRotationX, getRotationX };
}
