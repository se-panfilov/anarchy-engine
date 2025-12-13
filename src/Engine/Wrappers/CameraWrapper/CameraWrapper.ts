import type { CameraParams, ScreenParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { IDeviceWatcher } from '@Engine/Watchers';
import { getAccessors } from './Accessors';
import { isNotDefined } from '@Engine/Utils';
import { PerspectiveCamera } from 'three';

export function CameraWrapper(params: CameraParams, deviceWatcher: IDeviceWatcher): ICameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, position }: CameraParams = params;
  // TODO (S.Panfilov) Test this: aspect is 0 fot now, but should be set by deviceWatcher
  const entity: PerspectiveCamera = new PerspectiveCamera(fov, 0, near, far);
  entity.lookAt(lookAt.x, lookAt.y, lookAt.z);
  entity.position.set(position.x, position.y, position.z);

  deviceWatcher.value$.subscribe(({ width, height }: ScreenParams): void => {
    if (isNotDefined(entity)) return;
    // eslint-disable-next-line functional/immutable-data
    entity.aspect = width / height;
    entity.updateProjectionMatrix();
  });

  deviceWatcher.destroy$.subscribe(() => {
    deviceWatcher.value$.unsubscribe();
    deviceWatcher.destroy$.unsubscribe();
  });

  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
