import { Vector3 } from 'three';

import type { ICameraConfig, ICameraParams } from '../Models';

export function getParams(config: ICameraConfig): ICameraParams {
  const { position, rotation, ...rest } = config;
  return {
    ...rest,
    rotation: new Vector3(rotation.x, rotation.y, rotation.z),
    position: new Vector3(position.x, position.y, position.z)
  };
}
