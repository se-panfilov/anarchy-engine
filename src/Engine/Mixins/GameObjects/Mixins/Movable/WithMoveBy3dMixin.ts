import type { TMovable3dXYZ, TWithPosition3dProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveBy3dMixin(entity: TWithPosition3dProperty): TMovable3dXYZ {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity)
  };
}
