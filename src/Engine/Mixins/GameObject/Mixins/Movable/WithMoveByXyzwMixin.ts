import type { IMovableXYZW, IWithPositionXyzwProperty } from '@/Engine/Mixins/GameObject/Models';

import { withMoveByWMixin } from './withMoveByWMixin';
import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveByXyzwMixin(entity: IWithPositionXyzwProperty): IMovableXYZW {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity),
    ...withMoveByWMixin(entity)
  };
}
