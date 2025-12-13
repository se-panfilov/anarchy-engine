import { Vector3 } from 'three';

import type { TCameraConfig, TCameraParams } from '@/Engine/Camera/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: TCameraConfig): TCameraParams {
  const { position, rotation, scale, layers, lookAt, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    lookAt: lookAt ? new Vector3(lookAt.x, lookAt.y, lookAt.z) : undefined
  };
}
