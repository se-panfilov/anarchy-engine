import type { TMovable2dXY, TWithPosition2dProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';

export function withMoveBy2dMixin(entity: TWithPosition2dProperty): TMovable2dXY {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity)
  } as TMovable2dXY;
}
