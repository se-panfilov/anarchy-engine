import type { IMovableXYZ, IWithPositionXyzProperty } from '@/Engine/Mixins/GameObject/Models';

import { withMoveByXMixin } from './WithMoveByXMixin';
import { withMoveByYMixin } from './WithMoveByYMixin';
import { withMoveByZMixin } from './WithMoveByZMixin';

export function withMoveByXyzMixin(entity: IWithPositionXyzProperty): IMovableXYZ {
  return {
    ...withMoveByXMixin(entity),
    ...withMoveByYMixin(entity),
    ...withMoveByZMixin(entity)
  };
}
