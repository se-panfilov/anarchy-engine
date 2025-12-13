import type { TRendererConfig, TRendererParams, TRendererServiceDependencies } from '@/Engine/Renderer/Models';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TRendererConfig, { screenService }: TRendererServiceDependencies): TRendererParams | never {
  const { ...rest } = config;

  const canvas = screenService.getCanvas();
  if (isNotDefined(canvas)) throw new Error('Renderer: cannot convert config to params – canvas is not defined');

  return {
    ...rest,
    canvas
  };
}
