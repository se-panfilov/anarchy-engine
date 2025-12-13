import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable, TWithActiveMixin } from '@/Engine/Mixins';

export type TRendererWrapper = TWrapper<WebGLRenderer> & TWithActiveMixin & TDestroyable;
