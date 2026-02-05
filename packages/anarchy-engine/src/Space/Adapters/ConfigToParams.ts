import { sceneConfigToParams } from '@hellpig/anarchy-engine/Scene/Adapters';
import type { TSpaceConfig, TSpaceParams } from '@hellpig/anarchy-engine/Space/Models';

export function spaceConfigToParams(config: TSpaceConfig): TSpaceParams | never {
  const { scenes, ...rest } = config;

  return {
    ...rest,
    scenes: scenes.map(sceneConfigToParams),
    //we can't get entities here, services must be initialized first
    entities: undefined
  };
}
