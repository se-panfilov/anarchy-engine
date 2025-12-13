import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithActiveMixin, IWithTags } from '@/Engine/Mixins';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IWithActiveMixin & IWithTags<string> & IDestroyable;
