import type { ISceneConfig, ISceneParams } from '@/Engine/Domains/Scene/Models';
import { configToParamsObject3d } from '@/Engine/Domains/ThreeLib';

export function getParams(config: ISceneConfig): ISceneParams {
  const { position, rotation, scale, layers, animations, ...rest } = config;

  return {
    ...rest,
    ...configToParamsObject3d({ position, rotation, scale, layers, animations })
  };
}
