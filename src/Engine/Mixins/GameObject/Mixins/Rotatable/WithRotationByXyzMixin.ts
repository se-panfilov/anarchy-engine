import type { IRotatable, IWithRotationProperty } from '@/Engine/Mixins/GameObject/Models';

import { withRotationByXMixin } from './WithRotationByXMixin';
import { withRotationByYMixin } from './WithRotationByYMixin';
import { withRotationByZMixin } from './WithRotationByZMixin';

export function withRotationByXyzMixin(entity: IWithRotationProperty): IRotatable {
  return {
    ...withRotationByXMixin(entity),
    ...withRotationByYMixin(entity),
    ...withRotationByZMixin(entity)
  };
}
