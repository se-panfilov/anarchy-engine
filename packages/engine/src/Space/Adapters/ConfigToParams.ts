import { configToParams as sceneConfigAdapter } from '@/Scene/Adapters';
import type { TSpaceConfig, TSpaceParams } from '@/Space/Models';

export function configToParams(config: TSpaceConfig): TSpaceParams | never {
  const { scenes, ...rest } = config;

  return {
    ...rest,
    scenes: scenes.map(sceneConfigAdapter),
    //we can't get entities here, services must be initialized first
    entities: undefined
  };
}
