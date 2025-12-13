import type { TWithPosition2d, TWithPosition2dProperty } from '@/Engine/Mixins/GameObjects/Models';
import type { TVector2, TVector2Wrapper } from '@/Engine/Vector';
import { Vector2Wrapper } from '@/Engine/Vector';

export function withPosition2dMixin(entity: TWithPosition2dProperty): TWithPosition2d {
  const setPosition = (position: TVector2Wrapper): TVector2 => entity.position.set(position.getX(), position.getY());
  const addPosition = (position: TVector2Wrapper): TVector2 =>
    setPosition(
      Vector2Wrapper({
        x: entity.position.x + position.getX(),
        y: entity.position.y + position.getY()
      })
    );
  const getPosition = (): TVector2Wrapper => Vector2Wrapper(entity.position);
  return { setPosition, addPosition, getPosition };
}
