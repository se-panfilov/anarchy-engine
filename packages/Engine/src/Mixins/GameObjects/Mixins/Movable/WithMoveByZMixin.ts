import { withPositionMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position';
import type { TMovableZ, TWithPosition3dProperty, TWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByZMixin(entity: TWithPosition3dProperty | TWithPosition4dProperty): TMovableZ {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  const getZ = (): number => entity.position.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.position.z += z);

  return { ...withPositionMixin(entity), addZ, setZ, getZ };
}
