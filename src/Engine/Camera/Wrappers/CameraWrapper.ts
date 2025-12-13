import type { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { cameraToConfig } from '@/Engine/Camera/Adapters';
import type { TCamera, TCameraAccessors, TCameraConfig, TCameraParams, TCameraTransformDrive, TCameraWrapper, TCameraWrapperDependencies, TPerspectiveCamera } from '@/Engine/Camera/Models';
import { CameraTransformDrive } from '@/Engine/Camera/TransformDrive';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import type { TOptional, TWriteable } from '@/Engine/Utils';
import { applyObject3dParams, isDefined } from '@/Engine/Utils';

import { getAccessors } from './Accessors';

export function CameraWrapper(params: TCameraParams, { container, transformDriveService, audioService }: TCameraWrapperDependencies): TCameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, audioListener }: TCameraParams = params;
  const { width, height }: TOptional<DOMRect> = container.viewportRect$.value ?? { width: 0, height: 0 };
  const entity: TWriteable<TPerspectiveCamera> = new PerspectiveCamera(fov, container.getRatio(), near, far);

  const accessors: TCameraAccessors = getAccessors(entity);
  accessors.setAspect(width / height);

  const wrapper: TAbstractWrapper<TCamera> = AbstractWrapper(entity, WrapperType.Camera, { name: params.name });
  const drive: TCameraTransformDrive = CameraTransformDrive(params, { transformDriveService }, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  container.resize$.pipe(takeUntil(wrapper.destroy$)).subscribe(({ width, height }: DOMRect): void => accessors.setAspect(width / height));

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
  if (isDefined(audioListener)) accessors.addListener(audioListener);

  return result;
}
