import { PerspectiveCamera } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import { isNotDefined } from '@Engine/Utils';
import { DeviceWatcher } from '@Engine/Watchers/DeviceWatcher';
import type { CameraParams } from '@Engine/Models/CameraParams';

export class CameraWrapper extends AbstractWrapper<PerspectiveCamera> {
  public entity: PerspectiveCamera;

  constructor({ width, height, fov = 45, near = 1, far = 10000 }: CameraParams, deviceWatcher: DeviceWatcher) {
    super();
    this.entity = new PerspectiveCamera(fov, width / height, near, far);

    deviceWatcher.size$.subscribe(({ width, height }) => {
      if (isNotDefined(this.entity)) return;
      this.entity.aspect = width / height;
      this.entity.updateProjectionMatrix();
    });

    deviceWatcher.destroyed$.subscribe(() => {
      deviceWatcher.size$.unsubscribe();
    });
  }

  public setPosition(x: number, y: number, z: number): void {
    if (isNotDefined(this.entity)) throw new Error(`Wrapper "${this.id}" has no defined entity`);
    this.entity.position.set(x, y, z);
  }

  public lookAt(x: number, y: number, z: number): void {
    if (isNotDefined(this.entity)) throw new Error(`Wrapper "${this.id}" has no defined entity`);
    this.entity.lookAt(x, y, z);
  }

  public setControls(x: number, y: number, z: number): void {
    if (isNotDefined(this.entity)) throw new Error(`Wrapper "${this.id}" has no defined entity`);
    this.entity.position.set(x, y, z);
  }
}
