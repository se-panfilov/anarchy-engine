import type { IActive, IWithReadonlyTags } from '@/Engine/Mixins';
import type { RendererModes } from '@/Engine/Renderer/Constants';

import type { ITreeJsRendererParams } from './ITreeJsRendererParams';

export type IRendererParams = ITreeJsRendererParams &
  Readonly<{
    canvas: HTMLElement;
    mode: RendererModes;
    isShadowMapEnabled?: boolean;
    maxPixelRatio?: number;
  }> &
  IActive &
  IWithReadonlyTags;
