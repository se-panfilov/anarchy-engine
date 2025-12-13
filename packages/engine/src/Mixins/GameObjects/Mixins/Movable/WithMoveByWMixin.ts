import type { TMovableW, TWithPosition4dProperty } from '@/Mixins/GameObjects/Models';

export function withMoveByWMixin(entity: TWithPosition4dProperty): TMovableW {
  // eslint-disable-next-line functional/immutable-data
  const setW = (w: number): number => (entity.position.w = w);
  const getW = (): number => entity.position.w;
  // eslint-disable-next-line functional/immutable-data
  const addW = (w: number): number => (entity.position.w += w);

  return { addW, setW, getW };
}
