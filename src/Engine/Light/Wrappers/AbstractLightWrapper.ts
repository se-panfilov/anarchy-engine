import type { Subscription } from 'rxjs';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper } from '@/Engine/Abstract';
import { lightToConfig } from '@/Engine/Light/Adapters';
import type { LightType } from '@/Engine/Light/Constants';
import type { TAbstractLightConfig, TAbstractLightWrapper, TAnyLight, TLightParams, TLightServiceDependencies, TLightTransformDrive } from '@/Engine/Light/Models';
import { LightTransformDrive } from '@/Engine/Light/TransformDrive';
import { getWrapperType } from '@/Engine/Light/Utils';
import { applyShadowParams } from '@/Engine/Light/Wrappers/LightWrapperHelper';
import { withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { applyObject3dParams } from '@/Engine/Utils';

export function AbstractLightWrapper<T extends TAnyLight>(entity: T, params: TLightParams, dependencies: TLightServiceDependencies): TAbstractLightWrapper<T> {
  const wrapper: TAbstractWrapper<T> = AbstractWrapper(entity, getWrapperType(entity), { name: params.name, tags: params.tags });
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
