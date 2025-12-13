import type { IWrapper } from '@Engine/Models';
import type { WebGLRenderer } from 'three';

export type IRendererWrapper = IWrapper<WebGLRenderer> &
  Readonly<{
    destroy: () => void;
  }>;
