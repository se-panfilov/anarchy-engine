import { withPositionMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position';
import type { IMovable3dZ, IMovable4dZ, IWithPosition3dProperty, IWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByZMixin(entity: IWithPosition3dProperty): IMovable3dZ;
export function withMoveByZMixin(entity: IWithPosition4dProperty): IMovable4dZ;
export function withMoveByZMixin(entity: IWithPosition3dProperty | IWithPosition4dProperty): IMovable3dZ | IMovable4dZ {
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  const getZ = (): number => entity.position.z;
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.position.z += z);

  return { ...withPositionMixin(entity), addZ, setZ, getZ } as IMovable3dZ | IMovable4dZ;
}
