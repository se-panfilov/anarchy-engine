import type { WebGL1Renderer } from 'three';
import type { IWrapper } from '@Engine/Models';

export type IRendererWrapper = IWrapper<WebGL1Renderer> &
  Readonly<{
    destroy: () => void;
  }>;
