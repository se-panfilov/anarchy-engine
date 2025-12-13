import { AbstractWrapper } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TLight, TLightParams } from '@/Engine/Light/Models';
import { getWrapperType } from '@/Engine/Light/Utils';
import { applyShadowParams } from '@/Engine/Light/Wrappers/LightWrapperHelper';
import { withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation } from '@/Engine/Utils';

export function AbstractLightWrapper<T extends TLight>(entity: T, params: TLightParams): TAbstractLightWrapper<T> {
  const result: TAbstractLightWrapper<T> = {
    ...AbstractWrapper(entity, getWrapperType(entity), params),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    entity
  };

  applyShadowParams(params, result.entity);
  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  applyObject3dParams(result, params);

  return result;
}
