import type { TMovableX, TWithPositionProperty } from '@Anarchy/Engine/Mixins/GameObjects/Models';

export function withMoveByXMixin(entity: TWithPositionProperty): TMovableX {
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.position.x = x);
  const getX = (): number => entity.position.x;
  // eslint-disable-next-line functional/immutable-data
  const addX = (x: number): number => (entity.position.x += x);

  return { addX, setX, getX };
}
