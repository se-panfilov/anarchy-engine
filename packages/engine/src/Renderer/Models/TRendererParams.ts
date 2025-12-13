import type { TActive, TWithName, TWithTags } from '@Engine/Mixins';
import type { RendererModes } from '@Engine/Renderer/Constants';
import type { WebGLRendererParameters } from 'three';

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
