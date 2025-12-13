import type { TWithPosition3d, TWithPosition3dProperty } from '@/Engine/Mixins/GameObjects/Models';
import type { TVector3Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper } from '@/Engine/Vector';

export function withPosition3dMixin(entity: TWithPosition3dProperty): TWithPosition3d {
  const setPosition = (position: TVector3Wrapper): TVector3Wrapper => Vector3Wrapper(entity.position.set(position.getX(), position.getY(), position.getZ()));
  const getPosition = (): TVector3Wrapper => Vector3Wrapper(entity.position);
  return { setPosition, getPosition };
}
