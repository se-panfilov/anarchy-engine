import type { TAbstractWrapper } from '@hellpig/anarchy-engine/Abstract';
import { AbstractWrapper } from '@hellpig/anarchy-engine/Abstract';
import { lightEntityToConfig } from '@hellpig/anarchy-engine/Light/Adapters';
import type { LightType } from '@hellpig/anarchy-engine/Light/Constants';
import type { TAbstractLightConfig, TAbstractLightWrapper, TAnyLight, TLightParams, TLightServiceDependencies, TLightTransformDrive } from '@hellpig/anarchy-engine/Light/Models';
import { LightTransformDrive } from '@hellpig/anarchy-engine/Light/TransformDrive';
import { getWrapperType } from '@hellpig/anarchy-engine/Light/Utils';
import { applyShadowParams } from '@hellpig/anarchy-engine/Light/Wrappers/LightWrapperHelper';
import { withObject3d } from '@hellpig/anarchy-engine/Mixins';
import type { TDriveToTargetConnector } from '@hellpig/anarchy-engine/TransformDrive';
import { DriveToTargetConnector } from '@hellpig/anarchy-engine/TransformDrive';
import { applyObject3dParams } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

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
    serialize: (): TAbstractLightConfig<T> => lightEntityToConfig(result) as TAbstractLightConfig<T>
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
