import { withPositionXyzMixin } from '@/Engine/Mixins/GameObject/Mixins/Position';
import type { IMovableZ, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';

export function withMoveByZMixin(entity: IWithPositionXyzProperty): IMovableZ {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  const getZ = (): number => entity.position.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.position.z += z);

  return { ...withPositionXyzMixin(entity), addZ, setZ, getZ };
}
