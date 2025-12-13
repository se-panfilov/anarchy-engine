import type { IRotatable, IWithRotationProperty } from '@/Engine/Mixins/GameObject/Models';
import { withRotationByXMixin } from '@/Engine/Mixins/GameObject/WithRotationByXMixin';
import { withRotationByYMixin } from '@/Engine/Mixins/GameObject/WithRotationByYMixin';
import { withRotationByZMixin } from '@/Engine/Mixins/GameObject/WithRotationByZMixin';

export function withRotationByXyzMixin(entity: IWithRotationProperty): IRotatable {

  return {
    ...withRotationByXMixin(entity),
    ...withRotationByYMixin(entity),
    ...withRotationByZMixin(entity)
  };
}
