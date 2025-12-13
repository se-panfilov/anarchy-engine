import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { RendererModes, RendererTag } from '@/Engine/Renderer/Constants';

import type { ITreeJsRendererParams } from './ITreeJsRendererParams';

export type IRendererParams = ITreeJsRendererParams &
  Readonly<{
    canvas: HTMLElement;
    mode: RendererModes;
    maxPixelRatio?: number;
  }> &
  IWithReadonlyTags<RendererTag>;
