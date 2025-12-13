import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { IAmbientLight, IDirectionalLight, ILightParams, ILightWrapper, IPointLight } from '@/Engine/Light/Models';
import { withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation } from '@/Engine/Utils';

import { getAccessors } from './Accessors';
import { getLight } from './utils';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight | IPointLight = getLight(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Light, params),
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
