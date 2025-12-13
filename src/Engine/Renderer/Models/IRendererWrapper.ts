import type { WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { IWithActiveMixin, TWithTagsMixin, TDestroyable } from '@/Engine/Mixins';

export type IRendererWrapper = TWrapper<WebGLRenderer> & IWithActiveMixin & TWithTagsMixin & TDestroyable;
