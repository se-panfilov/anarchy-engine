import type { TActive, TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { RendererModes } from '@hellpig/anarchy-engine/Renderer/Constants';
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
