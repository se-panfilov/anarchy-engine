import { CameraParams } from '@Engine/Models/CameraParams';
import { Vector3dConfig } from '@Engine/Launcher/Models/SceneConfig';

export interface CameraConfig extends CameraParams {
  readonly params: {
    readonly fov: number;
    readonly near: number;
    readonly far: number;
  };
  readonly position: Vector3dConfig;
  readonly lookAt: Vector3dConfig;
}
