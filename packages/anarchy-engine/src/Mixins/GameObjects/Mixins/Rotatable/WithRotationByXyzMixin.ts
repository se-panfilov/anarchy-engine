import type { TQuaternionRotatable, TRotatable, TWithQuaternionRotationProperty, TWithRotationProperty } from '@Anarchy/Engine/Mixins/GameObjects/Models';

import { withQuaternionRotationByWMixin } from './WithRotationByWMixin';
import { withQuaternionRotationByXMixin, withRotationByXMixin } from './WithRotationByXMixin';
import { withQuaternionRotationByYMixin, withRotationByYMixin } from './WithRotationByYMixin';
import { withQuaternionRotationByZMixin, withRotationByZMixin } from './WithRotationByZMixin';

export function withRotationByXyzMixin(entity: TWithRotationProperty): TRotatable {
  return {
    ...withRotationByXMixin(entity),
    ...withRotationByYMixin(entity),
    ...withRotationByZMixin(entity)
  };
}

export function withQuaternionRotationByXyzMixin(entity: TWithQuaternionRotationProperty): TQuaternionRotatable {
  return {
    ...withQuaternionRotationByXMixin(entity),
    ...withQuaternionRotationByYMixin(entity),
    ...withQuaternionRotationByZMixin(entity),
    ...withQuaternionRotationByWMixin(entity)
  };
}
