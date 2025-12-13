import type { Euler } from 'three';

import type { IEulerWithY } from '@/Engine/Euler/Models';

export function eulerRotateByYMixin(entity: Euler): IEulerWithY {
  // eslint-disable-next-line functional/immutable-data
  const setRotationY = (y: number): number => (entity.y = y);
  const getRotationY = (): number => entity.y;
  // eslint-disable-next-line functional/immutable-data
  const adjustRotationByY = (y: number): number => (entity.y += y);

  return { adjustRotationByY, setRotationY, getRotationY };
}
