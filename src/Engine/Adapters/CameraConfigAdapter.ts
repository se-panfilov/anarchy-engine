import type { CameraConfig } from '@Engine/Launcher/Models';
import type { CameraParams } from '@Engine/Models';
import { Vector3 } from 'three';

export function cameraAdapter(config: CameraConfig): CameraParams {
  const { position, lookAt, ...rest } = config;
  return {
    ...rest,
    lookAt: new Vector3(lookAt.x, lookAt.y, lookAt.z),
    position: new Vector3(position.x, position.y, position.z)
  };
}
