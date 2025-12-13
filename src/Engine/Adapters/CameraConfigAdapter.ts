import type { ICameraParams } from '@Engine/Models';
import type { ICameraConfig } from '@Engine/SceneLauncher/Models';
import { Vector3 } from 'three';

export function cameraAdapter(config: ICameraConfig): ICameraParams {
  const { position, lookAt, ...rest } = config;
  return {
    ...rest,
    lookAt: new Vector3(lookAt.x, lookAt.y, lookAt.z),
    position: new Vector3(position.x, position.y, position.z)
  };
}
