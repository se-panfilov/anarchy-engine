import { ambientContext } from '@/Engine/Context';
import { configToParams as sceneConfigAdapter } from '@/Engine/Scene/Adapters';
import type { TSpaceCanvas } from '@/Engine/Space';
import type { TSpaceConfig, TSpaceParams } from '@/Engine/Space/Models';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TSpaceConfig): TSpaceParams | never {
  const { canvasSource, scenes, ...rest } = config;

  return {
    ...rest,
    scenes: scenes.map(sceneConfigAdapter),
    //we can't get entities here, services must be initialized first
    entities: undefined,
    canvas
  };
}
