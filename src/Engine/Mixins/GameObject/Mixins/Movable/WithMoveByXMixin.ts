import { withPositionXyzMixin } from '@/Engine/Mixins/GameObject/Mixins/Position';
import type { IMovableX, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';

export function withMoveByXMixin(entity: IWithPositionXyzProperty): IMovableX {
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.position.x = x);
  const getX = (): number => entity.position.x;
  // eslint-disable-next-line functional/immutable-data
  const addX = (x: number): number => (entity.position.x += x);

  return { ...withPositionXyzMixin(entity), addX, setX, getX };
}
