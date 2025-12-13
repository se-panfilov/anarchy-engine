import type { WebGLRendererParameters } from 'three';

import type { TActive, TWithName, TWithTags } from '@/Mixins';
import type { RendererModes } from '@/Renderer/Constants';

export type TRendererParams = WebGLRendererParameters &
  Readonly<{
    canvas: HTMLElement;
    mode: RendererModes;
    isShadowMapEnabled?: boolean;
    maxPixelRatio?: number;
  }> &
  TActive &
  TWithName &
  TWithTags;
