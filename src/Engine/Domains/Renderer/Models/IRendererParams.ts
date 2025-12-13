import type { CommonTags } from '@/Engine/Domains/Abstract';
import type { RendererModes, RendererTag } from '@/Engine/Domains/Renderer/Constants';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  mode: RendererModes;
  tags: ReadonlyArray<RendererTag | CommonTags | string>;
}>;
