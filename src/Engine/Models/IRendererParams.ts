import type { RendererTag } from '@Engine/Constants';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  tags: ReadonlyArray<RendererTag>;
}>;
