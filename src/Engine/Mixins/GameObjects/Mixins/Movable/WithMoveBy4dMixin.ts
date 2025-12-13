import type { IWithPosition4dProperty, TMovable4dXYZW } from '@/Engine/Mixins/GameObjects/Models';

import { withMoveByWMixin } from './WithMoveByWMixin';
import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveBy4dMixin(entity: IWithPosition4dProperty): TMovable4dXYZW {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity),
    ...withMoveByWMixin(entity)
  } as TMovable4dXYZW;
}
