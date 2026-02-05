import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TWithActiveMixin } from '@hellpig/anarchy-engine/Mixins';
import type { BehaviorSubject } from 'rxjs';
import type { WebGLRenderer } from 'three';

import type { TRendererAccessors } from './TRendererAccessors';
import type { TRendererParams } from './TRendererParams';

export type TRendererWrapper = TWrapper<WebGLRenderer> &
  TWithActiveMixin &
  TRendererAccessors &
  Readonly<{
    getParams: () => TRendererParams;
    isRendererReady$: BehaviorSubject<boolean>;
  }>;
