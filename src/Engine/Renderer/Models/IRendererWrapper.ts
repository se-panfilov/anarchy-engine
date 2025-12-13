import type { WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithTags } from '@/Engine/Mixins';

export type IRendererWrapper = IWrapper<WebGLRenderer> & IWithTags<string> & IDestroyable;
