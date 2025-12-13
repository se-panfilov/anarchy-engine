import type { TRendererConfig, TRendererParams, TRendererServiceDependencies } from '@Engine/Renderer/Models';
import type { TSpaceCanvas } from '@Engine/Space';
import { isNotDefined } from '@Engine/Utils';

export function configToParams(config: TRendererConfig, { container }: TRendererServiceDependencies): TRendererParams | never {
  const { ...rest } = config;

  const canvas: TSpaceCanvas | undefined = container.canvas$.value;
  if (isNotDefined(canvas)) throw new Error('Renderer: cannot convert config to params – canvas is not defined');

  return {
    ...rest,
    canvas
  };
}
