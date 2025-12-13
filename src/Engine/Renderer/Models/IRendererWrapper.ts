import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TDestroyable, IWithActiveMixin, IWithTagsMixin } from '@/Engine/Mixins';

export type IRendererWrapper = TWrapper<WebGLRenderer> & IWithActiveMixin & IWithTagsMixin & TDestroyable;
