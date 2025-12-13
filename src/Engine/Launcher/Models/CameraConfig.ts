import type { ICameraParams } from '@Engine/Models';
import type { Vector3dConfig } from '@Engine/Launcher/Models/Vector3dConfig';

export interface CameraConfig extends Omit<ICameraParams, 'lookAt' | 'position'> {
  readonly lookAt: Vector3dConfig;
  readonly position: Vector3dConfig;
}
