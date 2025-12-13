import type { RendererTag } from '@Engine/Domains/Renderer';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  tags: ReadonlyArray<RendererTag>;
}>;
