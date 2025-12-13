import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithActiveMixin, IWithTagsMixin } from '@/Engine/Mixins';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IWithActiveMixin & IWithTagsMixin<string> & IDestroyable;
