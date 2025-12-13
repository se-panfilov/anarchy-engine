import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { ICameraParams, ICameraWrapper, IPerspectiveCamera } from '@Engine/Domains/Camera/Models';
import type { IScreenParams } from '@Engine/Models';
import type { Writeable } from '@Engine/Utils';
import { isNotDefined } from '@Engine/Utils';
import type { IScreenSizeWatcher } from '@Engine/Watchers';
import { PerspectiveCamera } from 'three';

import { getAccessors } from './Accessors';

export function CameraWrapper(params: ICameraParams, screenSizeWatcher: Readonly<IScreenSizeWatcher>): ICameraWrapper {
  const { fov = 45, near = 1, far = 10000, lookAt, position, tags }: ICameraParams = params;
  // TODO (S.Panfilov) Test this: aspect is 0 fot now, but should be set by screenSizeWatcher
  const entity: Writeable<IPerspectiveCamera> = new PerspectiveCamera(fov, 0, near, far);
  entity.lookAt(lookAt.x, lookAt.y, lookAt.z);
  entity.position.set(position.x, position.y, position.z);

  // eslint-disable-next-line functional/prefer-immutable-types
  function setValues(entity: Writeable<IPerspectiveCamera>, { width, height }: IScreenParams): void {
    if (isNotDefined(entity)) return;
    // eslint-disable-next-line functional/immutable-data
    entity.aspect = width / height;
    entity.updateProjectionMatrix();
  }

  //init with the values which came before the start of the subscription
  setValues(entity, screenSizeWatcher.latest$.value);

  screenSizeWatcher.value$.subscribe((params: IScreenParams): void => setValues(entity, params));

  screenSizeWatcher.destroy$.subscribe(() => {
    screenSizeWatcher.value$.unsubscribe();
    screenSizeWatcher.destroy$.unsubscribe();
  });

  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity, tags };
}
