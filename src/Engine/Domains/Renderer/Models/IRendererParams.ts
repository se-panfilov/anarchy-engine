import type { RendererModes, RendererTag } from '@/Engine/Domains/Renderer/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IRendererParams = Readonly<{
  canvas: HTMLElement;
  mode: RendererModes;
}> &
  IWithReadonlyTags<RendererTag>;
