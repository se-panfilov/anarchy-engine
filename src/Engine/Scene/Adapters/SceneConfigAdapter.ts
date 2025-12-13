import type { ISceneConfig, ISceneParams } from '@/Engine/Scene/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: ISceneConfig): ISceneParams {
  const { position, rotation, scale, layers, animations, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
