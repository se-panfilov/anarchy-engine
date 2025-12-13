import { configToParams as sceneConfigAdapter } from '@Engine/Scene/Adapters';
import type { TSpaceConfig, TSpaceParams } from '@Engine/Space/Models';

export function configToParams(config: TSpaceConfig): TSpaceParams | never {
  const { scenes, ...rest } = config;

  return {
    ...rest,
    scenes: scenes.map(sceneConfigAdapter),
    //we can't get entities here, services must be initialized first
    entities: undefined
  };
}
