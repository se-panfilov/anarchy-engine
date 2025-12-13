import type { Subscription } from 'rxjs';

import type { TAbstractWrapper } from '@/Abstract';
import { AbstractWrapper } from '@/Abstract';
import { lightToConfig } from '@/Light/Adapters';
import type { LightType } from '@/Light/Constants';
import type { TAbstractLightConfig, TAbstractLightWrapper, TAnyLight, TLightParams, TLightServiceDependencies, TLightTransformDrive } from '@/Light/Models';
import { LightTransformDrive } from '@/Light/TransformDrive';
import { getWrapperType } from '@/Light/Utils';
import { applyShadowParams } from '@/Light/Wrappers/LightWrapperHelper';
import { withObject3d } from '@/Mixins';
import type { TDriveToTargetConnector } from '@/TransformDrive';
import { DriveToTargetConnector } from '@/TransformDrive';
import { applyObject3dParams } from '@/Utils';

export function AbstractLightWrapper<T extends TAnyLight>(entity: T, params: TLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<T> {
  const wrapper: TAbstractWrapper<T> = AbstractWrapper(entity, getWrapperType(entity), params);
  const drive: TLightTransformDrive = LightTransformDrive(params, dependencies, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result: TAbstractLightWrapper<T> = Object.assign(wrapper, {
    drive,
    driveToTargetConnector,
    ...withObject3d(entity),
    entity,
    getType: (): LightType => entity.type as LightType,
    serialize: (): TAbstractLightConfig<T> => lightToConfig(result) as TAbstractLightConfig<T>
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
