import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TWithActiveMixin } from '@Anarchy/Engine/Mixins';
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
