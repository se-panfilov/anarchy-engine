import type { Euler } from 'three';

import type { TEulerWithZ } from '@/Engine/Euler/Models';

export function eulerRotateByZMixin(entity: Euler): TEulerWithZ {
  // eslint-disable-next-line functional/immutable-data
  const setRotationZ = (z: number): number => (entity.z = z);
  const getRotationZ = (): number => entity.z;
  // eslint-disable-next-line functional/immutable-data
  const adjustRotationByZ = (z: number): number => (entity.z += z);

  return { adjustRotationByZ, setRotationZ, getRotationZ };
}
