import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TLight, TLightParams, TLightTransformDrive } from '@/Engine/Light/Models';
import { LightTransformDrive } from '@/Engine/Light/TransformDrive';
import { getWrapperType } from '@/Engine/Light/Utils';
import { applyShadowParams } from '@/Engine/Light/Wrappers/LightWrapperHelper';
import { withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { applyObject3dParams } from '@/Engine/Utils';

export function AbstractLightWrapper<T extends TLight>(entity: T, params: TLightParams): TAbstractLightWrapper<T> {
  const wrapper: TWrapper<T> = AbstractWrapper(entity, getWrapperType(entity), params);
  const drive: TLightTransformDrive = LightTransformDrive(params, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result: TAbstractLightWrapper<T> = Object.assign(wrapper, {
    drive,
    ...withObject3d(entity),
    entity
  });

  result.destroy$.subscribe((): void => driveToTargetConnector.destroy$.next());

  applyShadowParams(params, result.entity);
  applyObject3dParams(result, params);

  return result;
}
