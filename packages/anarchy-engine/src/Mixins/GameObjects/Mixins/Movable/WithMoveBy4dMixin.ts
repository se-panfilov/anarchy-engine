import type { TMovableXYZW, TWithPosition4dProperty } from '@hellpig/anarchy-engine/Mixins/GameObjects/Models';

import { withMoveByWMixin } from './WithMoveByWMixin';
import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveBy4dMixin(entity: TWithPosition4dProperty): TMovableXYZW {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity),
    ...withMoveByWMixin(entity)
  };
}
