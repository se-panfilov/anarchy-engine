import type { RendererModes, RendererTag } from '../Constants';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  mode: RendererModes;
  tags: ReadonlyArray<RendererTag>;
}>;
