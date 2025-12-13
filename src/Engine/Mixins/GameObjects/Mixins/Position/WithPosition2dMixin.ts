import type { TWithPosition2d, TWithPosition2dProperty } from '@/Engine/Mixins/GameObjects/Models';
import type { TVector2Wrapper } from '@/Engine/Vector';
import { Vector2Wrapper } from '@/Engine/Vector';

export function withPosition2dMixin(entity: TWithPosition2dProperty): TWithPosition2d {
  const setPosition = (position: TVector2Wrapper): TVector2Wrapper => Vector2Wrapper(entity.position.set(position.getX(), position.getY()));
  const getPosition = (): TVector2Wrapper => Vector2Wrapper(entity.position);
  return { setPosition, getPosition };
}
