import { PerspectiveCamera } from 'three';
import { deviceSize$ } from '../Store/DeviceSize';
import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import { WrappedCamera } from './Models/WrappedCamera';

export function CameraWrapper(
  width: number,
  height: number,
  fov: number = 45,
  near: number = 1,
  far: number = 10000
): WrappedCamera {
  let camera = new PerspectiveCamera(fov, width / height, near, far);
  const destroyed$ = new Subject<void>();

  deviceSize$.subscribe(({ width, height }) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  function destroy() {
    camera = undefined as any;
    deviceSize$.unsubscribe();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `camera_wrapper_${nanoid()}`, camera, destroy, destroyed$ };
}
