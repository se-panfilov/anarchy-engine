import type { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { cameraToConfig } from '@/Engine/Camera/Adapters';
import type { CameraType } from '@/Engine/Camera/Constants';
import type {
  TAnyCamera,
  TCameraTransformDrive,
  TCameraWrapperDependencies,
  TCommonCameraAccessors,
  TPerspectiveCamera,
  TPerspectiveCameraAccessors,
  TPerspectiveCameraConfig,
  TPerspectiveCameraParams,
  TPerspectiveCameraWrapper
} from '@/Engine/Camera/Models';
import { CameraTransformDrive } from '@/Engine/Camera/TransformDrive';
import { applyPerspectiveCameraParams } from '@/Engine/Camera/Utils';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import type { TOptional, TWriteable } from '@/Engine/Utils';
import { applyObject3dParams, isDefined, mergeAll } from '@/Engine/Utils';

import { getCommonCameraAccessors, getPerspectiveCameraAccessors } from './Accessors';

export function PerspectiveCameraWrapper(params: TPerspectiveCameraParams, { container, transformDriveService, audioService }: TCameraWrapperDependencies): TPerspectiveCameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, audioListener }: TPerspectiveCameraParams = params;
  const { width, height }: TOptional<DOMRect> = container.viewportRect$.value ?? { width: 0, height: 0 };

  const entity: TWriteable<TPerspectiveCamera> = new PerspectiveCamera(fov, container.getRatio(), near, far);

  const accessors: TCommonCameraAccessors & TPerspectiveCameraAccessors = Object.assign(getCommonCameraAccessors(entity), getPerspectiveCameraAccessors(entity));
  accessors.setAspect(width / height);

  const wrapper: TAbstractWrapper<TAnyCamera> = AbstractWrapper(entity, WrapperType.Camera, params);
  const drive: TCameraTransformDrive = CameraTransformDrive(params, { transformDriveService }, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  container.resize$.pipe(takeUntil(wrapper.destroy$)).subscribe(({ width, height }: DOMRect): void => {
    (accessors as unknown as TPerspectiveCameraAccessors).setAspect(width / height);
  });

  const result = mergeAll(wrapper, accessors, {
    drive,
    driveToTargetConnector,
    entity,
    getType: (): CameraType => entity.type as CameraType,
    ...withObject3d(entity),
    ...withActiveMixin(),
    serialize: (): TPerspectiveCameraConfig => cameraToConfig(result, { audioService })
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

  applyPerspectiveCameraParams(entity, params);

  return result;
}
