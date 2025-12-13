import type { Subscription } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TCameraAccessors, TCameraParams, TCameraTransformDrive, TCameraWrapper, TCameraWrapperDependencies, TPerspectiveCamera } from '@/Engine/Camera/Models';
import { CameraTransformDrive } from '@/Engine/Camera/TransformDrive';
import { withActiveMixin, withObject3d } from '@/Engine/Mixins';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import type { TWriteable } from '@/Engine/Utils';
import { applyObject3dParams, isDefined } from '@/Engine/Utils';

import { getAccessors } from './Accessors';

export function CameraWrapper(params: TCameraParams, { screenService }: TCameraWrapperDependencies): TCameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, audioListener }: TCameraParams = params;
  const { width, height, ratio } = screenService.watchers.default$.value?.getValue() ?? { width: 0, height: 0, ratio: 1 };
  const entity: TWriteable<TPerspectiveCamera> = new PerspectiveCamera(fov, ratio, near, far);

  const accessors: TCameraAccessors = getAccessors(entity);
  accessors.setAspect(width / height);

  const wrapper = AbstractWrapper(entity, WrapperType.Camera, params);
  const drive: TCameraTransformDrive = CameraTransformDrive(params, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    drive,
    driveToTargetConnector,
    ...accessors,
    entity,
    ...withObject3d(entity),
    ...withActiveMixin()
  });

  applyObject3dParams(result, params);
  result._setActive(params.isActive, true);

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
  });

  if (isDefined(lookAt)) accessors.lookAt(new Vector3(lookAt.x, lookAt.y, lookAt.z));
  if (isDefined(audioListener)) accessors.addListener(audioListener);

  return result;
}
