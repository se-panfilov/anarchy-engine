import type { TRotatable, TWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withRotationByXMixin } from './WithRotationByXMixin';
import { withRotationByYMixin } from './WithRotationByYMixin';
import { withRotationByZMixin } from './WithRotationByZMixin';

export function withRotationByXyzMixin(entity: TWithRotationProperty): TRotatable {
  return {
    ...withRotationByXMixin(entity),
    ...withRotationByYMixin(entity),
    ...withRotationByZMixin(entity)
  };
}
