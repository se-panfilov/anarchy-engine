import type { Subscription } from 'rxjs';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper } from '@/Engine/Abstract';
import { lightToConfig } from '@/Engine/Light/Adapters';
import type { TAbstractLightConfig, TAbstractLightWrapper, TLight, TLightParams, TLightServiceDependencies, TLightTransformDrive } from '@/Engine/Light/Models';
import { LightTransformDrive } from '@/Engine/Light/TransformDrive';
import { getWrapperType } from '@/Engine/Light/Utils';
import { applyShadowParams } from '@/Engine/Light/Wrappers/LightWrapperHelper';
import { withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { applyObject3dParams } from '@/Engine/Utils';

export function AbstractLightWrapper<T extends TLight>(entity: T, params: TLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<T> {
  const wrapper: TAbstractWrapper<T> = AbstractWrapper(entity, getWrapperType(entity), params);
  const drive: TLightTransformDrive = LightTransformDrive(params, dependencies, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result: TAbstractLightWrapper<T> = Object.assign(wrapper, {
    drive,
    driveToTargetConnector,
    ...withObject3d(entity),
    entity,
    serialize: (): TAbstractLightConfig<T> => lightToConfig(result)
  });

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    (entity as any).shadow?.map?.dispose();
    entity.dispose();
  });

  applyShadowParams(params, result.entity);
  applyObject3dParams(result, params);

  return result;
}
