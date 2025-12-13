import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable, TWithActiveMixin, TWithTagsMixin } from '@/Engine/Mixins';

export type TRendererWrapper = TWrapper<WebGLRenderer> & TWithActiveMixin & TWithTagsMixin & TDestroyable;
