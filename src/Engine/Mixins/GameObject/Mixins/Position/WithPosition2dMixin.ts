import type { IWithPosition2d, IWithPosition2dProperty } from '@/Engine/Mixins/GameObject/Models';
import type { IVector2Wrapper } from '@/Engine/Wrappers';
import { Vector2Wrapper } from '@/Engine/Wrappers';

export function withPosition2dMixin(entity: IWithPosition2dProperty): IWithPosition2d {
  const setPosition = (position: IVector2Wrapper): IVector2Wrapper => Vector2Wrapper(entity.position.set(position.getX(), position.getY()));
  const getPosition = (): IVector2Wrapper => Vector2Wrapper(entity.position);
  return { setPosition, getPosition };
}
