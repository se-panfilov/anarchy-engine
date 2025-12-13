import { withPositionMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position/WithPositionMixin';
import type { TMovableX, IWithPositionProperty } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByXMixin(entity: IWithPositionProperty): TMovableX {
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.position.x = x);
  const getX = (): number => entity.position.x;
  // eslint-disable-next-line functional/immutable-data
  const addX = (x: number): number => (entity.position.x += x);

  return { ...withPositionMixin(entity), addX, setX, getX };
}
