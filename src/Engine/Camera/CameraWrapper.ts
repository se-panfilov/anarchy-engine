import { PerspectiveCamera } from 'three';
import { deviceSize$ } from '@/Engine/Store/DeviceSize';
import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { WrappedCamera } from './Models/WrappedCamera';
import type { CameraParams } from '@Engine/Camera/Models/CameraParams';

export function CameraWrapper({ width, height, fov = 45, near = 1, far = 10000 }: CameraParams): WrappedCamera {
  let camera = new PerspectiveCamera(fov, width / height, near, far);
  const destroyed$ = new Subject<void>();

  // TODO (S.Panfilov) should access through params or manager?
  deviceSize$.subscribe(({ width, height }) => {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  function setPosition(x: number, y: number, z: number): void {
    camera.position.set(x, y, z);
  }

  function lookAt(x: number, y: number, z: number): void {
    camera.lookAt(x, y, z);
  }

  function setControls(x: number, y: number, z: number): void {
    camera.position.set(x, y, z);
  }

  function destroy() {
    camera = undefined as any;
    deviceSize$.unsubscribe();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `camera_wrapper_${nanoid()}`, camera, setPosition, lookAt, destroy, destroyed$ };
}
