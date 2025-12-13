import type { Vector3 } from 'three';

import type { IMovableZ } from '@/Engine/Mixins';

export function vectorMoveByZMixin(entity: Vector3): Omit<IMovableZ, 'setPosition' | 'getPosition'> {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.z = z);
  const getZ = (): number => entity.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.z += z);

  return { addZ, setZ, getZ };
}
