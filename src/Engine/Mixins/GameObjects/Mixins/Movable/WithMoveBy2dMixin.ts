import type { IMovable2dXY, IWithPosition2dProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';

export function withMoveBy2dMixin(entity: IWithPosition2dProperty): IMovable2dXY {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity)
  } as IMovable2dXY;
}
