import type { TAbstractWrapper } from '@Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@Engine/Abstract';
import { cameraToConfig } from '@Engine/Camera/Adapters';
import type { CameraType } from '@Engine/Camera/Constants';
import type {
  TAnyCamera,
  TCameraTransformDrive,
  TCameraWrapperDependencies,
  TCommonCameraAccessors,
  TOrthographicCamera,
  TOrthographicCameraAccessors,
  TOrthographicCameraParams,
  TOrthographicCameraWrapper
} from '@Engine/Camera/Models';
import type { TOrthographicCameraConfig } from '@Engine/Camera/Models/TOrthographicCameraConfig';
import { CameraTransformDrive } from '@Engine/Camera/TransformDrive';
import { applyOrthographicCameraParams } from '@Engine/Camera/Utils';
import { withActiveMixin, withObject3d } from '@Engine/Mixins';
import type { TDriveToTargetConnector } from '@Engine/TransformDrive';
import { DriveToTargetConnector } from '@Engine/TransformDrive';
import { applyObject3dParams, mergeAll } from '@Engine/Utils';
import type { TOptional, TWriteable } from '@Shared/Utils';
import { isDefined } from '@Shared/Utils';
import type { Subscription } from 'rxjs';
import { OrthographicCamera, Vector3 } from 'three';

import { getCommonCameraAccessors, getOrthographicCameraAccessors } from './Accessors';

export function OrthographicCameraWrapper(params: TOrthographicCameraParams, { container, transformDriveService, audioService }: TCameraWrapperDependencies): TOrthographicCameraWrapper {
  const { left, right, top, bottom, near, far = 10000, lookAt, audioListener }: TOrthographicCameraParams = params;
  const { width, height }: TOptional<DOMRect> = container.viewportRect$.value ?? { width: 0, height: 0 };

  const entity: TWriteable<TOrthographicCamera> = new OrthographicCamera(left, right, top, bottom, near, far);

  const accessors: TCommonCameraAccessors & TOrthographicCameraAccessors = Object.assign(getCommonCameraAccessors(entity), getOrthographicCameraAccessors(entity));
  accessors.setAspect(width, height);

  const wrapper: TAbstractWrapper<TAnyCamera> = AbstractWrapper(entity, WrapperType.Camera, params);
  const drive: TCameraTransformDrive = CameraTransformDrive(params, { transformDriveService }, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  const result = mergeAll(wrapper, accessors, {
    drive,
    driveToTargetConnector,
    entity,
    getType: (): CameraType => entity.type as CameraType,
    ...withObject3d(entity),
    ...withActiveMixin(),
    serialize: (): TOrthographicCameraConfig => cameraToConfig(result, { audioService })
  });

  applyObject3dParams(result, params);
  result._setActive(params.isActive, true);

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    if (isDefined(audioListener)) result.entity.remove(audioListener);
    destroySub$.unsubscribe();
  });

  if (isDefined(lookAt)) accessors.lookAt(new Vector3(lookAt.x, lookAt.y, lookAt.z));
  if (isDefined(params.up)) entity.up.set(params.up.x, params.up.y, params.up.z);
  if (isDefined(audioListener)) accessors.addListener(audioListener);
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.zoom)) entity.zoom = params.zoom;
  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.near)) entity.near = params.near;

  applyOrthographicCameraParams(entity, params);
  return result;
}
