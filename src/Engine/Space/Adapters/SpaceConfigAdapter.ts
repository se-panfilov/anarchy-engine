import { ambientContext } from '@/Engine/Context';
import { configToParams as sceneConfigAdapter } from '@/Engine/Scene/Adapters';
import type { TSpaceCanvas } from '@/Engine/Space';
import type { TSpaceConfig, TSpaceParams } from '@/Engine/Space/Models';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TSpaceConfig): TSpaceParams | never {
  const { canvasSource, scenes, ...rest } = config;

  const canvas: TSpaceCanvas | null = ambientContext.container.getCanvasElement(canvasSource);
  if (isNotDefined(canvas)) throw new Error('Space: cannot convert config to params: no canvas element found');

  return {
    ...rest,
    scenes: scenes.map(sceneConfigAdapter),
    //we can't get entities here, services must be initialized first
    entities: undefined,
    canvas
  };
}
