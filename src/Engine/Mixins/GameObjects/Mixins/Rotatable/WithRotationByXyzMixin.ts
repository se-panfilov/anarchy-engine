import type { TRotatable, IWithRotationProperty } from '@/Engine/Mixins/GameObjects/Models';

import { withRotationByXMixin } from './WithRotationByXMixin';
import { withRotationByYMixin } from './WithRotationByYMixin';
import { withRotationByZMixin } from './WithRotationByZMixin';

export function withRotationByXyzMixin(entity: IWithRotationProperty): TRotatable {
  return {
    ...withRotationByXMixin(entity),
    ...withRotationByYMixin(entity),
    ...withRotationByZMixin(entity)
  };
}
