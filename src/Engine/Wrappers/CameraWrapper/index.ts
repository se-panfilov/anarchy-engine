import { AbstractWrapper } from '@Engine/Wrappers';
import type { CameraParams } from '@Engine/Models';
import { getAccessors } from './Accessors';
import { isNotDefined } from '@Engine/Utils';
import { PerspectiveCamera } from 'three';

export type ICameraWrapper = ReturnType<typeof AbstractWrapper<PerspectiveCamera>> & ReturnType<typeof getAccessors>;

export function CameraWrapper({
  width,
  height,
  fov = 45,
  near = 1,
  far = 10000,
  lookAt,
  position
}: CameraParams): ICameraWrapper {
  const entity: PerspectiveCamera = new PerspectiveCamera(fov, width / height, near, far);
  entity.lookAt(lookAt.x, lookAt.y, lookAt.z);
  entity.position.set(position.x, position.y, position.z);

  // TODO (S.Panfilov) DI deviceWatcher
  deviceWatcher.size$.subscribe(({ width, height }) => {
    if (isNotDefined(entity)) return;
    entity.aspect = width / height;
    entity.updateProjectionMatrix();
  });

  deviceWatcher.destroyed$.subscribe(() => {
    deviceWatcher.size$.unsubscribe();
    deviceWatcher.destroyed$.unsubscribe();
  });

  return { ...AbstractWrapper(entity), ...getAccessors(entity), entity };
}
