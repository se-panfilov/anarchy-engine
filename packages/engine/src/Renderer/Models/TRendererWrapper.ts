import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Abstract';
import type { TWithActiveMixin } from '@/Mixins';

import type { TRendererAccessors } from './TRendererAccessors';
import type { TRendererParams } from './TRendererParams';

export type TRendererWrapper = TWrapper<WebGLRenderer> &
  TWithActiveMixin &
  TRendererAccessors &
  Readonly<{
    getParams: () => TRendererParams;
  }>;
