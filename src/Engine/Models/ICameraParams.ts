import type { Vector3 } from 'three';
import type { CameraTag } from '@Engine/Constants';

export interface ICameraParams {
  readonly fov?: number;
  readonly near?: number;
  readonly far?: number;
  readonly lookAt: Vector3;
  readonly position: Vector3;
  readonly tag: CameraTag;
}
