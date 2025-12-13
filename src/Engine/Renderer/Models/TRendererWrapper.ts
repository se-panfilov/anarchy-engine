import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, TDestroyable, TWithTagsMixin } from '@/Engine/Mixins';

export type TRendererWrapper = TWrapper<WebGLRenderer> & IWithActiveMixin & TWithTagsMixin & TDestroyable;
