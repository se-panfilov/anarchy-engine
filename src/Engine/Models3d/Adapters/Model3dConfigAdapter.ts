import { Vector3 } from 'three';

import type { TModel3dConfig, TModel3dParams } from '@/Engine/Models3d/Models';

export function model3dConfigToParams(config: TModel3dConfig): TModel3dParams {
  const { scale, ...rest } = config;

  return {
    scale: new Vector3(scale?.x, scale?.y, scale?.z),
    ...rest
  };
}
