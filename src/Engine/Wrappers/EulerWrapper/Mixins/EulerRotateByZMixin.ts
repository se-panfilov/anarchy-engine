import type { Euler } from 'three';

import type { IEulerWithZ } from '@/Engine/Wrappers/EulerWrapper/Models';

export function eulerRotateByZMixin(entity: Euler): IEulerWithZ {
  // eslint-disable-next-line functional/immutable-data
  const setRotationZ = (z: number): number => (entity.z = z);
  const getRotationZ = (): number => entity.z;
  // eslint-disable-next-line functional/immutable-data
  const adjustRotationByZ = (z: number): number => (entity.z += z);

  return { adjustRotationByZ, setRotationZ, getRotationZ };
}
