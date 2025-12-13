import type { TMovableXY, TWithPosition2dProperty } from '@Anarchy/Engine/Mixins/GameObjects/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';

export function withMoveBy2dMixin(entity: TWithPosition2dProperty): TMovableXY {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity)
  };
}
