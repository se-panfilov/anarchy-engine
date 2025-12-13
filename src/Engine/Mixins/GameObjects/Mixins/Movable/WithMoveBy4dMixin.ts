import type { IMovable4dXYZW, IWithPosition4dProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withMoveByWMixin } from './WithMoveByWMixin';
import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveBy4dMixin(entity: IWithPosition4dProperty): IMovable4dXYZW {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity),
    ...withMoveByWMixin(entity)
  } as IMovable4dXYZW;
}
