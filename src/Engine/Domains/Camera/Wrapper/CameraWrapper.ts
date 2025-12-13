import type { Subscription } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ICameraParams, ICameraWrapper, IPerspectiveCamera } from '@/Engine/Domains/Camera/Models';
import type { IScreenSizeValues, IScreenSizeWatcher } from '@/Engine/Domains/Screen';
import { withMoveByXyzMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';
import type { IWriteable } from '@/Engine/Utils';
import { applyObject3dParams, applyPosition, applyRotation, isDefined, isNotDefined } from '@/Engine/Utils';

import { getAccessors } from './Accessors';

export function CameraWrapper(params: ICameraParams, screenSizeWatcher: Readonly<IScreenSizeWatcher>): ICameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, tags }: ICameraParams = params;
  // TODO (S.Panfilov) Test this: aspect is 0 fot now, but should be set by screenSizeWatcher
  const entity: IWriteable<IPerspectiveCamera> = new PerspectiveCamera(fov, 0, near, far);

  // eslint-disable-next-line functional/prefer-immutable-types
  function setValues(entity: IWriteable<IPerspectiveCamera>, { width, height }: IScreenSizeValues): void {
    if (isNotDefined(entity)) return;
    // eslint-disable-next-line functional/immutable-data
    entity.aspect = width / height;
    entity.updateProjectionMatrix();
  }

  //init with the values which came before the start of the subscription
  setValues(entity, screenSizeWatcher.latest$.value);

  screenSizeWatcher.value$.subscribe((params: IScreenSizeValues): void => setValues(entity, params));

  const screenSizeWatcherSubscription: Subscription = screenSizeWatcher.destroyed$.subscribe(() => {
    screenSizeWatcher.value$.unsubscribe();
    screenSizeWatcherSubscription.unsubscribe();
  });

  const result = {
    ...AbstractWrapper(entity, WrapperType.Camera, params),
    ...getAccessors(entity),
    entity,
    ...withMoveByXyzMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    ...withTags(tags)
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  applyObject3dParams(result, params);

  if (isDefined(lookAt)) entity.lookAt(new Vector3(lookAt.entity.x, lookAt.entity.y, lookAt.entity.z));

  return result;
}
