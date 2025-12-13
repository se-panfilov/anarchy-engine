import type { Subscription } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { ICameraParams, ICameraWrapper, IPerspectiveCamera } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import { withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic';
import type { IScreenSizeValues, IScreenSizeWatcher } from '@/Engine/Screen';
import type { IWriteable } from '@/Engine/Utils';
import { applyObject3dParams, applyPosition, applyRotation, isDefined, isNotDefined } from '@/Engine/Utils';

import { getAccessors } from './Accessors';

export function CameraWrapper(params: ICameraParams, screenSizeWatcher: Readonly<IScreenSizeWatcher>): ICameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, tags }: ICameraParams = params;
  const aspectRatio: number = ambientContext.screenSizeWatcher.latest$.value.ratio || 0;
  const entity: IWriteable<IPerspectiveCamera> = new PerspectiveCamera(fov, aspectRatio, near, far);
  let isActive: boolean = false;

  const accessors = getAccessors(entity);

  function setValues(entity: IWriteable<IPerspectiveCamera>, { width, height }: IScreenSizeValues): void {
    if (isNotDefined(entity)) return;
    accessors.setAspect(width / height);
  }

  //init with the values which came before the start of the subscription
  setValues(entity, screenSizeWatcher.latest$.value);

  const screenSize$: Subscription = screenSizeWatcher.value$.subscribe((params: IScreenSizeValues): void => setValues(entity, params));

  const screenSizeWatcherSubscription: Subscription = screenSizeWatcher.destroyed$.subscribe(() => {
    screenSize$.unsubscribe();
    screenSizeWatcherSubscription.unsubscribe();
  });

  const result = {
    ...AbstractWrapper(entity, WrapperType.Camera, params),
    ...accessors,
    entity,
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...withObject3d(entity),
    ...withTags(tags),
    setActive: (value: boolean): void => void (isActive = value),
    isActive: (): boolean => isActive
  };

  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  applyObject3dParams(result, params);

  if (isDefined(lookAt)) entity.lookAt(new Vector3(lookAt.entity.x, lookAt.entity.y, lookAt.entity.z));

  return result;
}
