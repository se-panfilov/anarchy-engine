import type { RendererTag } from '@Engine/Domains/Renderer/Constants';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  tags: ReadonlyArray<RendererTag>;
}>;
