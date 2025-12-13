import type { TActive, TWithReadonlyTags } from '@/Engine/Mixins';
import type { RendererModes } from '@/Engine/Renderer/Constants';

import type { TRendererPerformanceOptions } from './TRendererPerformanceOptions';
import type { TTreeJsRendererParams } from './TTreeJsRendererParams';

export type TRendererParams = TTreeJsRendererParams &
  Readonly<{
    canvas: HTMLElement;
    mode: RendererModes;
    isShadowMapEnabled?: boolean;
    maxPixelRatio?: number;
    performance?: TRendererPerformanceOptions;
  }> &
  TActive &
  TWithReadonlyTags;
