import type { TSceneConfig, TSceneParams } from '@/Scene/Models';
import { configToParamsObject3d } from '@/ThreeLib';

export function configToParams(config: TSceneConfig): TSceneParams {
  const { position, rotation, scale, layers, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers })
  };
}
