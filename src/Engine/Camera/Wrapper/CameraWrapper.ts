import { PerspectiveCamera, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { ICameraAccessors, ICameraParams, ICameraWrapper, IPerspectiveCamera } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import { withActiveMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic';
import type { IWriteable } from '@/Engine/Utils';
import { applyObject3dParams, applyPosition, applyRotation, isDefined } from '@/Engine/Utils';

import { getAccessors } from './Accessors';

export function CameraWrapper(params: ICameraParams): ICameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, tags }: ICameraParams = params;
  const aspectRatio: number = ambientContext.screenSizeWatcher.latest$.value.ratio || 0;
  const entity: IWriteable<IPerspectiveCamera> = new PerspectiveCamera(fov, aspectRatio, near, far);

  const accessors: ICameraAccessors = getAccessors(entity);
  const { width, height } = ambientContext.screenSizeWatcher.latest$.value;
  accessors.setAspect(width / height);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Camera, params),
    ...accessors,
    entity,
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    ...withActiveMixin,
    ...withTags(tags)
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  applyObject3dParams(result, params);
  result._setActive(params.isActive, true);

  if (isDefined(lookAt)) entity.lookAt(new Vector3(lookAt.entity.x, lookAt.entity.y, lookAt.entity.z));

  return result;
}
