import type { TMovableXYZ, TWithPosition3dProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveBy3dMixin(entity: TWithPosition3dProperty): TMovableXYZ {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity)
  };
}
