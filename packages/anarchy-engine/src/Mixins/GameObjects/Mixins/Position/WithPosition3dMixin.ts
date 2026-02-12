import type { TWithPosition3d, TWithPosition3dProperty } from '@Anarchy/Engine/Mixins/GameObjects/Models';
import type { Vector3 } from 'three';

export function withPosition3dMixin(entity: TWithPosition3dProperty): TWithPosition3d {
  const setPosition = ({ x, y, z }: Vector3): Vector3 => entity.position.set(x, y, z);
  const addPosition = ({ x, y, z }: Vector3): Vector3 => entity.position.add({ x, y, z });
  const getPosition = (): Vector3 => entity.position;
  return { setPosition, addPosition, getPosition };
}
