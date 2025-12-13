import { Euler, Vector3 } from 'three';

import type { ICameraConfig, ICameraParams } from '../Models';

export function getParams(config: ICameraConfig): ICameraParams {
  const { position, rotation, ...rest } = config;
  return {
    ...rest,
    // rotation: EulerWrapper({x: rotation.x, y: rotation.y, z: rotation.z }),
    // position: Vector3Wrapper({x: position.x, y: position.y, z: position.z })
    rotation: new Euler(rotation.x, rotation.y, rotation.z),
    position: new Vector3(position.x, position.y, position.z)
  };
}
