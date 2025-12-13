import { withPositionMixin } from '@/Engine/Mixins/GameObject/Mixins/Position/WithPositionMixin';
import type { IMovableX, IWithPositionProperty } from '@/Engine/Mixins/GameObject/Models';

export function withMoveByXMixin(entity: IWithPositionProperty): IMovableX {
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.position.x = x);
  const getX = (): number => entity.position.x;
  // eslint-disable-next-line functional/immutable-data
  const addX = (x: number): number => (entity.position.x += x);

  return { ...withPositionMixin(entity), addX, setX, getX };
}
