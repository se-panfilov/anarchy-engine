import type { TSceneConfig, TSceneParams } from '@Anarchy/Engine/Scene/Models';
import { object3dConfigToParams } from '@Anarchy/Engine/ThreeLib';

export function sceneConfigToParams(config: TSceneConfig): TSceneParams {
  const { position, rotation, scale, layers, ...rest } = config;

  return {
    ...rest,
    ...object3dConfigToParams({ position, rotation, scale, layers })
  };
}
