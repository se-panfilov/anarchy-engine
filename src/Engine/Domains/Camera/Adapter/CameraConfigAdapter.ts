import { Vector3 } from 'three';

import type { ICameraConfig, ICameraParams } from '../Models';

export function fromConfig(config: ICameraConfig): ICameraParams {
  const { position, lookAt, ...rest } = config;
  return {
    ...rest,
    lookAt: new Vector3(lookAt.x, lookAt.y, lookAt.z),
    position: new Vector3(position.x, position.y, position.z)
  };
}
