import type { RendererModes, RendererTag } from '@/Engine/Domains/Renderer/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITreeJsRendererParams } from './ITreeJsRendererParams';

export type IRendererParams = ITreeJsRendererParams &
  Readonly<{
    canvas: HTMLElement;
    mode: RendererModes;
    maxPixelRatio?: number;
  }> &
  IWithReadonlyTags<RendererTag>;
