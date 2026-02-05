import type { TSceneConfig, TSceneParams } from '@hellpig/anarchy-engine/Scene/Models';
import { object3dConfigToParams } from '@hellpig/anarchy-engine/ThreeLib';

export function sceneConfigToParams(config: TSceneConfig): TSceneParams {
  const { position, rotation, scale, layers, ...rest } = config;

  return {
    ...rest,
    ...object3dConfigToParams({ position, rotation, scale, layers })
  };
}
