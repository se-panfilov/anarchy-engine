import { withPositionXyzMixin } from '@/Engine/Mixins/GameObject/Mixins/Position';
import type { IMovableY, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';

export function withMoveByYMixin(entity: IWithPositionXyzProperty): IMovableY {
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.position.y = y);
  const getY = (): number => entity.position.y;
  // eslint-disable-next-line functional/immutable-data
  const addY = (y: number): number => (entity.position.y += y);

  return { ...withPositionXyzMixin(entity), addY, setY, getY };
}
