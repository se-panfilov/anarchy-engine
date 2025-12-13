import { withPositionMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position/WithPositionMixin';
import type { IMovableY, IWithPositionProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByYMixin(entity: IWithPositionProperty): IMovableY {
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.position.y = y);
  const getY = (): number => entity.position.y;
  // eslint-disable-next-line functional/immutable-data
  const addY = (y: number): number => (entity.position.y += y);

  return { ...withPositionMixin(entity), addY, setY, getY };
}
