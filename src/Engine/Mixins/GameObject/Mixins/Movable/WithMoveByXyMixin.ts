import type { IMovableXY, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';

export function withMoveByXyMixin(entity: IWithPositionXyzProperty): IMovableXY {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity)
  };
}
