import type { Subscription } from 'rxjs';
import type { Controls } from 'three';
import { EventDispatcher, Quaternion } from 'three';

import type { TCameraWrapper } from '@/Engine/Camera';
import { ControlsType } from '@/Engine/Controls/Constants';
import type { TControlsWrapper, TFpsControlsWrapper, TOrbitControlsWrapper } from '@/Engine/Controls/Models';
import type { TMilliseconds } from '@/Engine/Math';

export const isOrbitControls = (controls: TOrbitControlsWrapper | TControlsWrapper): controls is TOrbitControlsWrapper => controls.getType() === ControlsType.OrbitControls;
export const isFpsControls = (controls: TFpsControlsWrapper | TControlsWrapper): controls is TFpsControlsWrapper => controls.getType() === ControlsType.FirstPersonControls;

export function updateCameraTransformDriveOnChange(controls: TOrbitControlsWrapper | TFpsControlsWrapper, camera: TCameraWrapper): void {
  function updateCameraDrive(): void {
    const dumpingTime: TMilliseconds = ((controls as TOrbitControlsWrapper).entity.enableDamping ? 250 : 0) as TMilliseconds; // 250 is an average dumping time for OrbitControls
    setTimeout((): void => {
      camera.drive.position$.next(camera.entity.position);
      camera.drive.rotation$.next(new Quaternion().setFromEuler(camera.entity.rotation));
    }, dumpingTime);
  }

  // TransformDrive cannot handle direct changes, such as Controls on Camera, so we are updating it.
  (controls as TOrbitControlsWrapper).entity.addEventListener?.('end', updateCameraDrive);

  const destroySub$: Subscription = controls.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    (controls as TOrbitControlsWrapper).entity.removeEventListener?.('end', updateCameraDrive);
  });
}

export function makeControlsEvented<T extends Controls<any>>(controls: T): T & EventDispatcher {
  // eslint-disable-next-line functional/immutable-data
  Object.assign(controls, new EventDispatcher());
  return controls as T & EventDispatcher;
}
