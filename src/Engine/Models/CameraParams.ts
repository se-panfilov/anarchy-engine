import type { Vector3 } from 'three';

export interface CameraParams {
  readonly width?: number;
  readonly height?: number;
  readonly fov?: number;
  readonly near?: number;
  readonly far?: number;
  readonly lookAt: Vector3;
  readonly position: Vector3;
}
