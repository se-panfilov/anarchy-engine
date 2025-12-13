import { withPosition4dMixin } from '@/Engine/Mixins/GameObjects/Mixins/Position';
import type { IWithPosition4dProperty, TMovable4dW } from '@/Engine/Mixins/GameObjects/Models';

export function withMoveByWMixin(entity: IWithPosition4dProperty): TMovable4dW {
  // eslint-disable-next-line functional/immutable-data
  const setW = (w: number): number => (entity.position.w = w);
  const getW = (): number => entity.position.w;
  // eslint-disable-next-line functional/immutable-data
  const addW = (w: number): number => (entity.position.w += w);

  return { ...withPosition4dMixin(entity), addW, setW, getW };
}
