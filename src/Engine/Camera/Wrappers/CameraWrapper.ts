import type { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Vector3 } from 'three';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { cameraToConfig } from '@/Engine/Camera/Adapters';
import type {
  TCamera,
  TCameraConfig,
  TCameraParams,
  TCameraTransformDrive,
  TCameraWrapper,
  TCameraWrapperDependencies,
  TCommonCameraAccessors,
  TOrthographicCamera,
  TPerspectiveCamera,
  TPerspectiveCameraAccessors
} from '@/Engine/Camera/Models';
import { CameraTransformDrive } from '@/Engine/Camera/TransformDrive';
import { applyOrthographicCameraParams, applyPerspectiveCameraParams, createCamera, isOrthographicCamera, isPerspectiveCamera } from '@/Engine/Camera/Utils';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import type { TOptional, TWriteable } from '@/Engine/Utils';
import { applyObject3dParams, isDefined } from '@/Engine/Utils';

import { getCommonCameraAccessors, getOrthographicCameraAccessors, getPerspectiveCameraAccessors } from './Accessors';

export function CameraWrapper(params: TCameraParams, { container, transformDriveService, audioService }: TCameraWrapperDependencies): TCameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, audioListener }: TCameraParams = params;
  const { width, height }: TOptional<DOMRect> = container.viewportRect$.value ?? { width: 0, height: 0 };

  const entity: TWriteable<TPerspectiveCamera | TOrthographicCamera> = createCamera({ ...params, fov, near, far }, container);

  const accessors: TCommonCameraAccessors = getCommonCameraAccessors(entity);
  if (isPerspectiveCamera(entity)) {
    // eslint-disable-next-line functional/immutable-data
    Object.assign(accessors, getPerspectiveCameraAccessors(entity));
    (accessors as unknown as TPerspectiveCameraAccessors).setAspect(width / height);
  }
  // eslint-disable-next-line functional/immutable-data
  if (isOrthographicCamera(entity)) Object.assign(accessors, getOrthographicCameraAccessors(entity));

  const wrapper: TAbstractWrapper<TCamera> = AbstractWrapper(entity, WrapperType.Camera, { name: params.name, tags: params.tags });
  const drive: TCameraTransformDrive = CameraTransformDrive(params, { transformDriveService }, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  if (isPerspectiveCamera(entity)) {
    container.resize$.pipe(takeUntil(wrapper.destroy$)).subscribe(({ width, height }: DOMRect): void => {
      (accessors as unknown as TPerspectiveCameraAccessors).setAspect(width / height);
    });
  }

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, accessors, {
    drive,
    driveToTargetConnector,
    entity,
    ...withObject3d(entity),
    ...withActiveMixin(),
    serialize: (): TCameraConfig => cameraToConfig(result, { audioService })
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

  if (isPerspectiveCamera(entity)) applyPerspectiveCameraParams(entity, params);
  else if (isOrthographicCamera(entity)) applyOrthographicCameraParams(entity, params);
  else throw new Error(`[Camera]: Unsupported camera type: ${params.type}`);

  return result;
}
