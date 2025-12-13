import type { TRendererConfig, TRendererParams, TRendererServiceDependencies } from '@/Renderer/Models';
import type { TSpaceCanvas } from '@/Space';
import { isNotDefined } from '@/Utils';

export function configToParams(config: TRendererConfig, { container }: TRendererServiceDependencies): TRendererParams | never {
  const { ...rest } = config;

  const canvas: TSpaceCanvas | undefined = container.canvas$.value;
  if (isNotDefined(canvas)) throw new Error('Renderer: cannot convert config to params – canvas is not defined');

  return {
    ...rest,
    canvas
  };
}
