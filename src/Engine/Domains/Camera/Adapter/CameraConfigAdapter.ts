import type { ICameraConfig, ICameraParams } from '@/Engine/Domains/Camera/Models';
import { configToParamsObject3d } from '@/Engine/Domains/ThreeLib';
import { Vector3Wrapper } from '@/Engine/Domains/Vector';

export function configToParams(config: ICameraConfig): ICameraParams {
  const { position, rotation, scale, layers, lookAt, animations, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations }),
    lookAt: lookAt ? Vector3Wrapper({ x: lookAt.x, y: lookAt.y, z: lookAt.z }) : undefined
  };
}
