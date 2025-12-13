import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IAmbientLight, IDirectionalLight, ILightParams, ILightWrapper } from '@/Engine/Domains/Light/Models';
import { withMoveByXyzMixin, withObject3d,withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation } from '@/Engine/Utils';

import { getAccessors } from './Accessors';
import { getLight } from './utils';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight = getLight(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Light, params),
    ...getAccessors(entity),
    ...withMoveByXyzMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    entity
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  applyObject3dParams(result, params);

  return result;
}
