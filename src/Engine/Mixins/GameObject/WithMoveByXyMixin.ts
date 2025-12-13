import type { IMovableXY, IWithPositionProperty } from '@/Engine/Mixins/GameObject/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';

export function withMoveByXyMixin(entity: IWithPositionProperty): IMovableXY {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity)
  };
}
