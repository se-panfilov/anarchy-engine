import type { ICameraConfig, ICameraParams } from '@/Engine/Domains/Camera/Models';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

export function getParams(config: ICameraConfig): ICameraParams {
  const { position, rotation, ...rest } = config;
  return {
    ...rest,
    rotation: EulerWrapper({ x: rotation.x, y: rotation.y, z: rotation.z }),
    position: Vector3Wrapper({ x: position.x, y: position.y, z: position.z })
  };
}
