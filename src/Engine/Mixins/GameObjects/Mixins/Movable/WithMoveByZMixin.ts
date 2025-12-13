import { withPositionMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position';
import type { TMovable3dZ, TMovable4dZ, TWithPosition3dProperty, TWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByZMixin(entity: TWithPosition3dProperty): TMovable3dZ;
export function withMoveByZMixin(entity: TWithPosition4dProperty): TMovable4dZ;
export function withMoveByZMixin(entity: TWithPosition3dProperty | TWithPosition4dProperty): TMovable3dZ | TMovable4dZ {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  const getZ = (): number => entity.position.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.position.z += z);

  return { ...withPositionMixin(entity), addZ, setZ, getZ } as TMovable3dZ | TMovable4dZ;
}
