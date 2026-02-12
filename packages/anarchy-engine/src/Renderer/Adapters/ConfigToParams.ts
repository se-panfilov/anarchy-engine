import type { TRendererConfig, TRendererParams, TRendererServiceDependencies } from '@Anarchy/Engine/Renderer/Models';
import type { TSpaceCanvas } from '@Anarchy/Engine/Space';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';

export function rendererConfigToParams(config: TRendererConfig, { container }: TRendererServiceDependencies): TRendererParams | never {
  const { ...rest } = config;

  const canvas: TSpaceCanvas | undefined = container.canvas$.value;
  if (isNotDefined(canvas)) throw new Error('Renderer: cannot convert config to params – canvas is not defined');

  return {
    ...rest,
    canvas
  };
}
