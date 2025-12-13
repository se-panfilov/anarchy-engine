import type { IWithPositionXY, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';
import type { IVector2Wrapper } from '@/Engine/Wrappers';
import { Vector2Wrapper } from '@/Engine/Wrappers';

export function withPositionXyMixin(entity: IWithPositionXyzProperty): IWithPositionXY {
  const setPosition = (position: IVector2Wrapper): IVector2Wrapper => Vector2Wrapper(entity.position.set(position.getX(), position.getY()));
  const getPosition = (): IVector2Wrapper => Vector2Wrapper(entity.position);
  return { setPosition, getPosition };
}
