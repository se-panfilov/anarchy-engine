import { PerspectiveCamera } from 'three';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import { isNotDefined } from '@Engine/Utils';

export class CameraWrapper extends AbstractWrapper<PerspectiveCamera> {
  public entity: PerspectiveCamera;

  constructor({ width, height, fov = 45, near = 1, far = 10000 }: CameraParams, deviceSizeManager: DeviceSizeManager) {
    super();
    this.entity = new PerspectiveCamera(fov, width / height, near, far);

    // TODO (S.Panfilov) should access through params or manager?
    deviceSizeManager.deviceSize$.subscribe(({ width, height }) => {
      if (isNotDefined(this.entity)) return;
      this.entity.aspect = width / height;
      this.entity.updateProjectionMatrix();
    });

    deviceSizeManager.destroyed$.subscribe(() => {
      deviceSizeManager.deviceSize$.unsubscribe();
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

export interface CameraParams {
  readonly width: number;
  readonly height: number;
  readonly fov?: number;
  readonly near?: number;
  readonly far?: number;
}
