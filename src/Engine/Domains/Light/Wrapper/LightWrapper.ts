import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IAmbientLight, IDirectionalLight, ILightParams, ILightWrapper } from '@/Engine/Domains/Light/Models';
import { moveableMixin, rotatableMixin, withObject3d } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation } from '@/Engine/Utils';

import { getAccessors } from './Accessors';
import { getLight } from './utils';

export function LightWrapper(params: ILightParams): ILightWrapper {
  const entity: IAmbientLight | IDirectionalLight = getLight(params);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Light, params),
    ...getAccessors(entity),
    ...moveableMixin(entity),
    ...rotatableMixin(entity),
    ...withObject3d(entity),
    entity
  };

  applyPosition(params.position, result);
  applyRotation(params.rotation, result);
  applyObject3dParams(params, result);

  return result;
}
