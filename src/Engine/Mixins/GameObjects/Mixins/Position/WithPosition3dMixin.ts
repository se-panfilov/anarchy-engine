import type { TWithPosition3d, TWithPosition3dProperty } from '@/Engine/Mixins/GameObjects/Models';
import type { TVector3, TVector3Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withPosition3dMixin(entity: TWithPosition3dProperty): TWithPosition3d {
  const setPosition = (position: TVector3Wrapper): TVector3 => entity.position.set(position.getX(), position.getY(), position.getZ());
  const addPosition = (position: TVector3Wrapper): TVector3 =>
    setPosition(Vector3Wrapper({ x: entity.position.x + position.getX(), y: entity.position.y + position.getY(), z: entity.position.z + position.getZ() }));
  const getPosition = (): TVector3Wrapper => Vector3Wrapper(entity.position);
  return { setPosition, addPosition, getPosition };
}
