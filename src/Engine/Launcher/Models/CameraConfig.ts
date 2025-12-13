import type { CameraParams } from '@Engine/Models/CameraParams';
import type { Vector3dConfig } from './Vector3dConfig';

export interface CameraConfig extends CameraParams {
  readonly params: {
    readonly fov: number;
    readonly near: number;
    readonly far: number;
  };
  readonly position: Vector3dConfig;
  readonly lookAt: Vector3dConfig;
}
