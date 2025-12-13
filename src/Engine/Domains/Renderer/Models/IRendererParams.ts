import type { RendererTag } from '../Constants';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  tags: ReadonlyArray<RendererTag>;
}>;
