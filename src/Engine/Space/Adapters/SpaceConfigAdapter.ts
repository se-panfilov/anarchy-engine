import type { TAppCanvas } from '@/Engine/App';
import { ambientContext } from '@/Engine/Context';
import type { TSceneConfig, TSceneParams } from '@/Engine/Scene';
import { configToParams as sceneConfigAdapter } from '@/Engine/Scene/Adapters';
import type { TSpaceConfig, TSpaceParams } from '@/Engine/Space/Models';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TSpaceConfig): TSpaceParams | never {
  const { canvasSource, scenes, ...rest } = config;

  const canvas: TAppCanvas | null = ambientContext.container.getCanvasElement(canvasSource);
  if (isNotDefined(canvas)) throw new Error('Space: cannot convert config to params: no canvas element found');

  return {
    ...rest,
    scenes: scenes.map((scene: TSceneConfig): TSceneParams => sceneConfigAdapter(scene)),
    //we can't get entities here, services must be initialized first
    entities: undefined,
    canvas
  };
}
