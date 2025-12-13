import { withPositionXyzwMixin } from '@/Engine/Mixins/GameObject/Mixins/Position';
import type { IMovableW, IWithPositionXyzwProperty } from '@/Engine/Mixins/GameObject/Models';

export function withMoveByWMixin(entity: IWithPositionXyzwProperty): IMovableW {
  // eslint-disable-next-line functional/immutable-data
  const setW = (w: number): number => (entity.position.w = w);
  const getW = (): number => entity.position.w;
  // eslint-disable-next-line functional/immutable-data
  const addW = (w: number): number => (entity.position.w += w);

  return { ...withPositionXyzwMixin(entity), addW, setW, getW };
}
