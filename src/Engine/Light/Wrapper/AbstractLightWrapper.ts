import { AbstractWrapper } from '@/Engine/Abstract';
import type { IAbstractLightWrapper, ILight, ILightParams } from '@/Engine/Light/Models';
import { withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation } from '@/Engine/Utils';

import { getAccessors } from './Accessors';
import { getWrapperType } from './utils';

export function AbstractLightWrapper<T extends ILight>(entity: T, params: ILightParams): IAbstractLightWrapper<T> {
  const result: IAbstractLightWrapper<T> = {
    ...AbstractWrapper(entity, getWrapperType(entity), params),
    ...getAccessors(entity),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  applyObject3dParams(result, params);

  return result;
}
