import type { TModel3dConfig, TModel3dParams } from '@/Engine/Models3d/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function model3dConfigToParams(config: TModel3dConfig): TModel3dParams {
  const { position: posConfig, rotation: rotConfig, scale: scaleConfig, ...rest } = config;
  const { position, rotation, scale } = configToParamsObject3d({ position: posConfig, rotation: rotConfig, scale: scaleConfig });

  return {
    position,
    rotation,
    scale,
    ...rest
  };
}
