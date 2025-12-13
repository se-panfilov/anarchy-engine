import { AbstractWrapper } from '@Engine/Wrappers';
import type { CameraParams } from '@Engine/Models';
import { getAccessors } from './Accessors';
import { isNotDefined } from '@Engine/Utils';
import { PerspectiveCamera } from 'three';
import { DeviceWatcher } from '@Engine/Watchers';

export type ICameraWrapper = ReturnType<typeof AbstractWrapper<PerspectiveCamera>> & ReturnType<typeof getAccessors>;

export function CameraWrapper({ fov = 45, near = 1, far = 10000, lookAt, position }: CameraParams): ICameraWrapper {
  // TODO (S.Panfilov) Test this: aspect is 0 fot now, but should be set by deviceWatcher
  const entity: PerspectiveCamera = new PerspectiveCamera(fov, 0, near, far);
  entity.lookAt(lookAt.x, lookAt.y, lookAt.z);
  entity.position.set(position.x, position.y, position.z);

  // TODO (S.Panfilov) DI deviceWatcher instead of a creation of a new entity
  const deviceWatcher: ReturnType<typeof DeviceWatcher> = DeviceWatcher();

  deviceWatcher.value$.subscribe(({ width, height }) => {
    if (isNotDefined(entity)) return;
    entity.aspect = width / height;
    entity.updateProjectionMatrix();
  });

  deviceWatcher.destroyed$.subscribe(() => {
    deviceWatcher.value$.unsubscribe();
    deviceWatcher.destroyed$.unsubscribe();
  });

  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
