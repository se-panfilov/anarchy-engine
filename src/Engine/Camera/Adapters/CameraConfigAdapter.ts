import type { TCameraConfig, TCameraParams } from '@/Engine/Camera/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { Vector3Wrapper } from '@/Engine/Vector';

export function configToParams(config: TCameraConfig): TCameraParams {
  const { position, rotation, scale, layers, lookAt, animations, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations }),
    lookAt: lookAt ? Vector3Wrapper({ x: lookAt.x, y: lookAt.y, z: lookAt.z }) : undefined
  };
}
