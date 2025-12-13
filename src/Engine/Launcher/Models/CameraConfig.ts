import type { CameraParams } from '@Engine/Models';
import type { Vector3dConfig } from './Vector3dConfig';

export interface CameraConfig {
  readonly params: CameraParams;
  readonly position: Vector3dConfig;
  readonly lookAt: Vector3dConfig;
}
