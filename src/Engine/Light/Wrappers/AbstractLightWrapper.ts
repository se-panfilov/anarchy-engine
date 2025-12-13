import { AbstractWrapper } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TLight, TLightParams } from '@/Engine/Light/Models';
import { LightTransformDrive } from '@/Engine/Light/TransformDrive';
import { getWrapperType } from '@/Engine/Light/Utils';
import { applyShadowParams } from '@/Engine/Light/Wrappers/LightWrapperHelper';
import { withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TTransformDrive } from '@/Engine/TransformDrive';
import { applyObject3dParams } from '@/Engine/Utils';

export function AbstractLightWrapper<T extends TLight>(entity: T, params: TLightParams): TAbstractLightWrapper<T> {
  const drive: TTransformDrive = LightTransformDrive(params);

  const result: TAbstractLightWrapper<T> = {
    ...AbstractWrapper(entity, getWrapperType(entity), params),
    drive,
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    entity
  };

  applyShadowParams(params, result.entity);
  applyObject3dParams(result, params);

  return result;
}
