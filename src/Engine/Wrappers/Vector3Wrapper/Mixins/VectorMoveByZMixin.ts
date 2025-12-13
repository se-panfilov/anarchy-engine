import type { Vector3 } from 'three';

import type { IVectorWithZ } from '@/Engine/Wrappers/Vector3Wrapper/Models';

export function vectorMoveByZMixin(entity: Vector3): IVectorWithZ {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.z = z);
  const getZ = (): number => entity.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.z += z);

  return { addZ, setZ, getZ };
}
