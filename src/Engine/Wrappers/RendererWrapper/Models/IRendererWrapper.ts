import type { WebGLRenderer } from 'three';
import type { IWrapper } from '@Engine/Models';

export type IRendererWrapper = IWrapper<WebGLRenderer> &
  Readonly<{
    destroy: () => void;
  }>;
