import type { TWrapper } from '@Engine/Abstract';
import type { TWithActiveMixin } from '@Engine/Mixins';
import type { WebGLRenderer } from 'three';

import type { TRendererAccessors } from './TRendererAccessors';
import type { TRendererParams } from './TRendererParams';

export type TRendererWrapper = TWrapper<WebGLRenderer> &
  TWithActiveMixin &
  TRendererAccessors &
  Readonly<{
    getParams: () => TRendererParams;
  }>;
