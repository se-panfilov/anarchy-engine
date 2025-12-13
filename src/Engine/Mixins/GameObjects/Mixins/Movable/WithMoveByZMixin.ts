import { withPositionMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position';
import type { IWithPosition3dProperty, IWithPosition4dProperty, TMovable3dZ, TMovable4dZ } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByZMixin(entity: IWithPosition3dProperty): TMovable3dZ;
export function withMoveByZMixin(entity: IWithPosition4dProperty): TMovable4dZ;
export function withMoveByZMixin(entity: IWithPosition3dProperty | IWithPosition4dProperty): TMovable3dZ | TMovable4dZ {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  const getZ = (): number => entity.position.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.position.z += z);

  return { ...withPositionMixin(entity), addZ, setZ, getZ } as TMovable3dZ | TMovable4dZ;
}
