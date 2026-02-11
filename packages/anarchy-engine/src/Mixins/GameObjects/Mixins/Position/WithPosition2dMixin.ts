import type { TWithPosition2d, TWithPosition2dProperty } from '@Anarchy/Engine/Mixins/GameObjects/Models';
import { Vector2 } from 'three';

export function withPosition2dMixin(entity: TWithPosition2dProperty): TWithPosition2d {
  const setPosition = (position: Vector2): Vector2 => entity.position.set(position.x, position.y);
  const addPosition = (position: Vector2): Vector2 => setPosition(new Vector2(entity.position.x + position.x, entity.position.y + position.y));
  const getPosition = (): Vector2 => new Vector2(entity.position.x, entity.position.y);
  return { setPosition, addPosition, getPosition };
}
